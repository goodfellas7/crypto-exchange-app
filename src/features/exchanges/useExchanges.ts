import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getBinanceTicker, selectBinanceData, selectBinanceStatus } from '../binance/binanceSlice';
import { getBitfinexTicker, selectBitfinexData, selectBitfinexStatus } from '../bitfinex/bitfinexSlice';
import { getHuobiTicker, selectHuobiData, selectHuobiStatus } from '../huobi/huobiSlice';
import { getKrakenTicker, selectKrakenData, selectKrakenStatus } from '../kraken/krakenSlice';
import { Exchange, ExchangesParams } from './exchangesTypes';

const useExchanges = (params: ExchangesParams) => {
  const binance = useAppSelector(selectBinanceData);
  const binanceStatus = useAppSelector(selectBinanceStatus);
  const bitfinex = useAppSelector(selectBitfinexData);
  const bitfinexStatus = useAppSelector(selectBitfinexStatus);
  const huobi = useAppSelector(selectHuobiData);
  const huobiStatus = useAppSelector(selectHuobiStatus);
  const kraken = useAppSelector(selectKrakenData);
  const krakenStatus = useAppSelector(selectKrakenStatus);
  const dispatch = useAppDispatch();

  const { cryptocurrencyPair, sort } = params;

  const exchanges = useMemo(() => {
    const pair = cryptocurrencyPair?.toUpperCase();
    let arr: Exchange[] = [{
      platform: 'Binance',
      price: parseFloat(binance?.price || '') || 0,
      status: binanceStatus,
      pair,
    }, {
      platform: 'Bitfinex',
      price: parseFloat(bitfinex?.last_price || '') || 0,
      status: bitfinexStatus,
      pair,
    }, {
      platform: 'Huobi',
      price: huobi?.close || 0,
      status: huobiStatus,
      pair,

    }, {
      platform: 'Kraken',
      price: parseFloat(kraken?.c[0] || '') || 0,
      status: krakenStatus,
      pair,
    }];

    if (sort?.orderBy === 'price') {
      arr.sort((a, b) => {
        if (sort?.order === 'asc') {
          return a.price - b.price;
        }

        return b.price - a.price;
      })
    }

    return arr;
  }, [
    binance?.price,
    bitfinex?.last_price,
    huobi?.close,
    kraken?.c,
    binanceStatus,
    bitfinexStatus,
    huobiStatus,
    krakenStatus,
    sort
  ]);

  const isLoading = useMemo(() => exchanges.some(e => e.status === 'loading'), [exchanges]);
  const isLoaded = useMemo(() => {
    return exchanges.every(e => e.status !== 'idle');
  }, [exchanges]);

  useEffect(() => {
    const searchValue = cryptocurrencyPair?.split('_').join('') || '';
    const loadData = () => {
      dispatch(getBinanceTicker(searchValue));
      dispatch(getBitfinexTicker(searchValue));
      dispatch(getHuobiTicker(searchValue));
      dispatch(getKrakenTicker(searchValue));
    };

    if (searchValue) {
      loadData();
    }
  }, [cryptocurrencyPair, dispatch]);

  return { exchanges, isLoading, isLoaded };
};

export default useExchanges;

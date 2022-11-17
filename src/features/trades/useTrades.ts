import { useEffect, useMemo } from 'react';
import { useAppDispatch } from '../../app/hooks';
import useBinanceTrades from '../binance/useBinanceTrades';
import useBitfinexTrades from '../bitfinex/useBitfinexTrades';
import useHuobiTrades from '../huobi/useHuobiTrades';
import useKrakenTrades from '../kraken/useKrakenTrades';
import { getBinanceTrades, setBinanceTrades } from '../binance/binanceSlice';
import { getBitfinexTrades, setBitfinexTrades } from '../bitfinex/bitfinexSlice';
import { getHuobiTrades, setHuobiTrades } from '../huobi/huobiSlice';
import { getKrakenTrades, setKrakenTrades } from '../kraken/krakenSlice';
import { TradesParams } from './tradesTypes';

const useTrades = ({ platform, cryptocurrencyPair = '' }: TradesParams) => {
  const binanceTrades = useBinanceTrades();
  const bitfinexTrades = useBitfinexTrades();
  const huobiTrades = useHuobiTrades();
  const krakenTrades = useKrakenTrades();

  const dispatch = useAppDispatch();

  const trades = useMemo(() => {
    switch (platform) {
      case 'Binance':
        return binanceTrades;
      case 'Bitfinex':
        return bitfinexTrades;
      case 'Huobi':
        return huobiTrades;
      case 'Kraken':
        return krakenTrades;
      default:
        return [];
    };
  }, [platform, binanceTrades, bitfinexTrades, huobiTrades, krakenTrades]);

  useEffect(() => {
    const searchValue = cryptocurrencyPair?.split('_').join('');

    if (!platform) {
      dispatch(setBinanceTrades([]));
      dispatch(setBitfinexTrades([]));
      dispatch(setHuobiTrades([]));
      dispatch(setKrakenTrades([]));
    } else if (searchValue) {
      switch (platform) {
        case 'Binance':
          dispatch(getBinanceTrades({ symbol: searchValue }))
          break;
        case 'Bitfinex':
          dispatch(getBitfinexTrades({ symbol: searchValue }));
          break;
        case 'Huobi':
          dispatch(getHuobiTrades({ symbol: searchValue }));
          break;
        case 'Kraken':
          dispatch(getKrakenTrades({ symbol: searchValue }));
          break;
        default:
          break;
      }
    }
  }, [platform, cryptocurrencyPair, dispatch]);

  return trades;
};

export default useTrades;

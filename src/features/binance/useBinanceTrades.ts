import { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Trade } from '../common/commonTypes';
import { selectBinanceTrades } from './binanceSlice';

const useBinanceTrades = () => {
  const binanceTrades = useAppSelector(selectBinanceTrades);

  const mappedBinanceTrades = useMemo(() => {
    return binanceTrades.map(({ price, qty, quoteQty }) => {
      const item: Trade = {
        price: parseFloat(price),
        amount: parseFloat(qty),
        total: parseFloat(quoteQty)
      };
      return item;
    });
  }, [binanceTrades]);

  return mappedBinanceTrades;
};

export default useBinanceTrades;

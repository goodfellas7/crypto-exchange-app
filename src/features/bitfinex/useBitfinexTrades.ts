import { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Trade } from '../common/commonTypes';
import { selectBitfinexTrades } from './bitfinexSlice';

const useBitfinexTrades = () => {
  const bitfinexTrades = useAppSelector(selectBitfinexTrades);
  
  const mappedBitfinexTrades = useMemo(() => {
    return bitfinexTrades.map((bitfinexTrade) => {
      const price = parseFloat(bitfinexTrade.price);
      const amount = parseFloat(bitfinexTrade.amount);
      
      const item: Trade = {
        price: price,
        amount: amount,
        total: price * amount
      };
      return item;
    });
  }, [bitfinexTrades]);

  return mappedBitfinexTrades;
};

export default useBitfinexTrades;

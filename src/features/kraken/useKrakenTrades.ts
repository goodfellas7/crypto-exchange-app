import { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Trade } from '../common/commonTypes';
import { selectKrakenTrades } from './krakenSlice';

const useKrakenTrades = () => {
  const krakenTrades = useAppSelector(selectKrakenTrades);

  const mappedKrakenTrades = useMemo(() => {
    return krakenTrades.map(krakenTradeArr => {
      const price = parseFloat(krakenTradeArr[0]);
      const amount = parseFloat(krakenTradeArr[1]);

      const item: Trade = {
        price,
        amount,
        total: price * amount
      };
      return item;
    });
  }, [krakenTrades]);

  return mappedKrakenTrades;
};

export default useKrakenTrades;

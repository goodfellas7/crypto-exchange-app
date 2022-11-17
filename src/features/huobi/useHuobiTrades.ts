import { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectHuobiTrades } from './huobiSlice';
import { Trade } from '../common/commonTypes';

const useHuobiTrades = ()=> {
  const huobiTrades = useAppSelector(selectHuobiTrades);

  const mappedHuobiTrades = useMemo(() => {
    return huobiTrades.reduce((prev, curr) => {
      const arr = curr.data.map(item => ({
        price: item.price,
        amount: item.amount,
        total: item.price * item.amount
      }));
      return [...prev, ...arr];
    }, [] as Trade[])
  }, [huobiTrades]);

  return mappedHuobiTrades;
};

export default useHuobiTrades;

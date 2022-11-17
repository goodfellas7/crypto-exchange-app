import { Platform, Trade } from '../common/commonTypes';

export type TradesTableProps = {
  trades: Trade[];
};

export type TradesParams = {
  platform?: Platform | null;
  cryptocurrencyPair?: string;
};

import { Platform, Sort, Status } from '../common/commonTypes';

export type Exchange = {
  platform: Platform;
  price: number;
  status: Status;
  pair?: string;
};

export type ExchangesProps = {
  cryptocurrencyPair?: string;
};

export type ExchangeTableProps = {
  exchanges: Exchange[];
  sort?: Sort<keyof Exchange>;
  onSortChange: (sort: Sort<keyof Exchange>) => void;
  onShowExchange: (platform: Platform) => void;
};

export type ExchangesParams = {
  cryptocurrencyPair?: string;
  sort?: Sort;
};
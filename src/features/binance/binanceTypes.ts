import { CryptoState } from '../common/commonTypes';

export type Binance = {
  symbol: string;
  price: string;
};

export type BinanceTrade = {
  id: any;
  price: string;
  qty: string;
  quoteQty: string;
  time: any;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
};

export type BinanceState = CryptoState<Binance, BinanceTrade[]>;

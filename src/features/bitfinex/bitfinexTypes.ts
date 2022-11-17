import { CryptoState } from '../common/commonTypes';

export type BitfinexTicker = {
  mid: string;
  bid: string;
  ask: string;
  last_price: string;
  low: string;
  high: string;
  volume: string;
  timestamp: string;
};

export type BitfinexTrade = {
  timestamp: number;
  tid: number;
  price: string;
  amount: string;
  exchange: string;
  type: string;
};

export type BitfinexState = CryptoState<BitfinexTicker, BitfinexTrade[]>;

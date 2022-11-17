import { CryptoState } from '../common/commonTypes';

export interface HuobiTicker {
  id: number;
  low: number;
  high: number;
  open: number;
  close: number;
  vol: number;
  amount: number;
  version: number;
  count: number;
};

export interface HuobiTickerResponse {
  ch: string;
  status: string;
  ts: number;
  tick: HuobiTicker;
  'err-msg'?: string;
}

export interface HuobiTradeResponse {
  ch: string
  status: string
  ts: number
  data: HuobiTradeData[]
};

export interface HuobiTradeData {
  id: number
  ts: number
  data: HuobiTrade[]
};

export interface HuobiTrade {
  id: number
  ts: number
  'trade-id': number
  amount: number
  price: number
  direction: string
};

export type HuobiState = CryptoState<HuobiTicker, HuobiTradeData[]>;

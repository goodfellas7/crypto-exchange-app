import { CryptoState } from '../common/commonTypes';

export type KrakenTicker = {
  a: string[];
  b: string[];
  c: string[];
  v: string[];
  p: string[];
  t: number[];
  l: string[];
  h: string[];
  o: string;
};

export type KrakenState = CryptoState<KrakenTicker, Array<[string, string, number, string, string]>>;

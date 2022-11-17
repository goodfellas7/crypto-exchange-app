export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

export type CryptoState<T, U = any> = {
  data: T | null;
  trades: U;
  status: Status;
};

export type Sort<T = any> = {
  order: 'asc' | 'desc';
  orderBy: T;
};

export type Platform = 'Binance' | 'Bitfinex' | 'Huobi' | 'Kraken';

export type Trade = {
  price: number;
  amount: number;
  total: number;
};

export type TradeActionParams = { 
  symbol: string;
  limit?: number; 
};

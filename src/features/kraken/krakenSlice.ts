import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { TradeActionParams } from '../common/commonTypes';
import { KrakenState } from './krakenTypes';

const initialState: KrakenState = {
  data: null,
  trades: [],
  status: 'idle'
};

export const getKrakenTicker = createAsyncThunk('kraken/getTicker', async (symbol: string) => {
  const url = `/0/public/Ticker?pair=${symbol.toLowerCase()}`;
  const data = await fetch(url).then(res => res.json());
  const [firstResultKey] = Object.keys(data.result);
  return data.result[firstResultKey];
});

export const getKrakenTrades = createAsyncThunk('kraken/getTrades',  async ({ symbol, limit = 10 }: TradeActionParams) => {
  const url = `/0/public/Trades?pair=${symbol}`;
  const data = await fetch(url).then(res => res.json());
  const [firstResultKey] = Object.keys(data.result).filter(key => key !== 'last');
  return data.result[firstResultKey].slice(0, limit);
});

const krakenSlice = createSlice({
  initialState,
  name: 'kraken',
  reducers: {
    setKrakenData: (state, action) => {
      state.data = action.payload;
    },
    setKrakenTrades: (state, action) => {
      state.trades = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(getKrakenTicker.pending, state => {
      state.status = 'loading';
    })
      .addCase(getKrakenTicker.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getKrakenTicker.rejected, state => {
        state.status = 'failed';
      })
      .addCase(getKrakenTrades.fulfilled, (state, action) => {
        state.trades = action.payload;
      })
  }
});

export const selectKrakenData = (state: RootState) => state.kraken.data;
export const selectKrakenStatus = (state: RootState) => state.kraken.status;
export const selectKrakenTrades = (state: RootState) => state.kraken.trades;

export const { setKrakenTrades } = krakenSlice.actions;

export default krakenSlice.reducer;

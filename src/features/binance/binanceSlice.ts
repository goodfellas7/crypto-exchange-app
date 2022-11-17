import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { TradeActionParams } from '../common/commonTypes';
import { BinanceState } from './binanceTypes';

const initialState: BinanceState = {
  data: null,
  trades: [],
  status: 'idle'
};

export const getBinanceTicker = createAsyncThunk('binance/getTicker', async (symbol: string, { rejectWithValue }) => {
  const url = `/api/v3/ticker/price?symbol=${symbol?.toUpperCase()}`;
  try {
    const data = await fetch(url).then(async res => {
      if (res.ok) {
        return res.json();
      }

      const { message } = await res.json();
      return Promise.reject(message);
    });
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const getBinanceTrades = createAsyncThunk('binance/getTrades', async ({ symbol, limit = 10 }: TradeActionParams) => {
  const url = `/api/v3/trades?symbol=${symbol?.toUpperCase()}&limit=${limit}`;
  const data = await fetch(url).then(res => res.json());
  return data;
});

const binanceSlice = createSlice({
  initialState,
  name: 'binance',
  reducers: {
    setBinanceData: (state, action) => {
      state.data = action.payload;
    },
    setBinanceTrades: (state, action) => {
      state.trades = [];
    }
  },
  extraReducers: builder => {
    builder.addCase(getBinanceTicker.pending, state => {
      state.status = 'loading';
    })
      .addCase(getBinanceTicker.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getBinanceTicker.rejected, state => {
        state.status = 'failed';
      })
      .addCase(getBinanceTrades.fulfilled, (state, action) => {
        state.trades = action.payload;
      })
  }
});

export const selectBinanceData = (state: RootState) => state.binance.data;
export const selectBinanceStatus = (state: RootState) => state.binance.status;
export const selectBinanceTrades = (state: RootState) => state.binance.trades;

export const { setBinanceTrades } = binanceSlice.actions;

export default binanceSlice.reducer;

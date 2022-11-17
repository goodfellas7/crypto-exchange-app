import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { TradeActionParams } from '../common/commonTypes';
import { BitfinexState } from './bitfinexTypes';

const initialState: BitfinexState = {
  data: null,
  trades: [],
  status: 'idle'
};

export const getBitfinexTicker = createAsyncThunk('bitfinex/getTicker', async (symbol: string, { fulfillWithValue, rejectWithValue }) => {
  const url = `/v1/pubticker/${symbol}`;
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

export const getBitfinexTrades = createAsyncThunk('bitfinex/getTrades', async ({ symbol, limit = 10 }: TradeActionParams) => {
  const url = `/v1/trades/${symbol}?limit_trades=${limit}`;
  const data = await fetch(url).then(res => res.json());
  return data;
});

const bitfinexSlice = createSlice({
  initialState,
  name: 'bitfinex',
  reducers: {
    setBitfinexData: (state, action) => {
      state.data = action.payload;
    },
    setBitfinexTrades: (state, action) => {
      state.trades = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(getBitfinexTicker.pending, state => {
      state.status = 'loading';
    })
      .addCase(getBitfinexTicker.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(getBitfinexTicker.rejected, state => {
        state.status = 'failed';
      })
      .addCase(getBitfinexTrades.fulfilled, (state, action) => {
        state.trades = action.payload;
      })
  }
});

export const selectBitfinexData = (state: RootState) => state.bitfinex.data;
export const selectBitfinexStatus = (state: RootState) => state.bitfinex.status;
export const selectBitfinexTrades = (state: RootState) => state.bitfinex.trades;

export const { setBitfinexTrades } = bitfinexSlice.actions;

export default bitfinexSlice.reducer;

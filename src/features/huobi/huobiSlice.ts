import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { TradeActionParams } from '../common/commonTypes';
import { HuobiState, HuobiTickerResponse, HuobiTradeResponse } from './huobiTypes';

const huobiApiUrl = 'https://api.huobi.pro';

const initialState: HuobiState = {
  data: null,
  trades: [],
  status: 'idle'
};

export const getHuobiTicker = createAsyncThunk('huobi/getTicker', async (symbol: string, { rejectWithValue }) => {
  const url = `${huobiApiUrl}/market/detail?symbol=${symbol.toLowerCase()}`;
  const data: HuobiTickerResponse = await fetch(url).then(res => res.json());
  if (data.status === 'error') {
    return rejectWithValue(data['err-msg']);
  }
  return data.tick;
});

export const getHuobiTrades = createAsyncThunk('huobi/getTrades', async ({ symbol, limit = 10 }: TradeActionParams) => {
  const url = `${huobiApiUrl}/market/history/trade?symbol=${symbol?.toLowerCase()}&size=${limit}`;
  const huobiTradeRes: HuobiTradeResponse = await fetch(url).then(res => res.json());
  return huobiTradeRes.data;
});

const huobiSlice = createSlice({
  initialState,
  name: 'huobi',
  reducers: {
    setHuobiData: (state, action) => {
      state.data = action.payload;
    },
    setHuobiTrades: (state, action) => {
      state.trades = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(getHuobiTicker.pending, state => {
      state.status = 'loading';
    })
    .addCase(getHuobiTicker.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'succeeded';
    })
    .addCase(getHuobiTicker.rejected, state => {
      state.status = 'failed';
    })
    .addCase(getHuobiTrades.fulfilled, (state, action) => {
      state.trades = action.payload;
    })
  }
});

export const selectHuobiData = (state: RootState) => state.huobi.data;
export const selectHuobiStatus = (state: RootState) => state.huobi.status;
export const selectHuobiTrades = (state: RootState) => state.huobi.trades;

export const { setHuobiTrades } = huobiSlice.actions;

export default huobiSlice.reducer;

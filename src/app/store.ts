import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
// import { createStore, combineReducers } from 'redux';
// import binanceReducer from '../features/binance/reducers/binanceReducer';
// import bitfinexReducer from '../features/bitfinex/reducers/bitfinexReducer';
// import krakenReducer from '../features/kraken/actions/reducers/krakenReducer';
// import huobiReducer from '../features/huobi/reducers/huobiReducer';

import binanceReducer from '../features/binance/binanceSlice';
import bitfinexReducer from '../features/bitfinex/bitfinexSlice';
import krakenReducer from '../features/kraken/krakenSlice';
import huobiReducer from '../features/huobi/huobiSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    binance: binanceReducer,
    bitfinex: bitfinexReducer,
    kraken: krakenReducer,
    huobi: huobiReducer,
  }
});

// const rootReducer = combineReducers({
//   binance: binanceReducer,
//   bitfinex: bitfinexReducer,
//   huobi: huobiReducer,
//   kraken: krakenReducer,
// });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

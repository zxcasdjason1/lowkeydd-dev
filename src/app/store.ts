import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import channelStoreReducer from "../features/channelStore/slice";
import visitStoreReducer from "../features/visitStore/slice";
import userReducer from "../features/user/slice";
import theaterReducer from "../features/theater/slice";

const reducer = combineReducers({
  channelStore: channelStoreReducer,
  visitStore: visitStoreReducer,
  user: userReducer,
  theater: theaterReducer,
});

const middleware = getDefaultMiddleware({
  serializableCheck: false,
});

// const preloadedState = {
//   channels:{
//     favored:[],
//     resident:[],
//   },
//   visit:{
//     list:[],
//   },
//   user:{
//     username: "",
//     ssid: "",
//   }
// }

export const store = configureStore({
  reducer,
  middleware,
  // preloadedState,
});

// 透過其回傳值自行推斷出 Store 的形態
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

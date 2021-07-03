import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import groupedChannelsReducer from "../features/groupedChannels/slice";
import groupedVisitItemsReducer from "../features/groupedVisitItems/slice";
import userReducer from "../features/user/slice";

const reducer = combineReducers({
  groupedChannels: groupedChannelsReducer,
  groupedVisitItems: groupedVisitItemsReducer,
  user: userReducer,
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

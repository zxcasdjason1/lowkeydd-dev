import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import channelgroupsReducer from "../features/channelGroups/slice";
import visitReducer from "../features/visit/slice";
import userReducer from "../features/user/slice";

const reducer = combineReducers({
  channelgroups: channelgroupsReducer,
  visit: visitReducer,
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

import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { UserState } from "../../app/types";
import { getCookie } from "./shares/cookies";
import * as reducers from "./reducers";

const initialState: UserState = {
  username: getCookie("username"),
  ssid: getCookie("ssid"),
  msg: "",
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers,
});

export const {setMsg, setUserLogin, setUserRegister, onErrorAndClearUser}= slice.actions;
export default slice.reducer;



export const selectUser = (state: RootState) => state.user;
export const selectMsg = createSelector([selectUser], (user) => {
  return user.msg;
});
export const selectIsLogin = createSelector([selectUser], (user) => {
  return user.username !== "" && user.username !== "";
});

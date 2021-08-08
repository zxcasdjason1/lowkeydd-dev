import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { UserLoginResponse, UserSession, UserState } from "../../app/types";

const setSession = (state: UserState, session: UserSession) => {
  const { username, ssid, expiration } = session;
  state.username = username;
  state.ssid = ssid;
  setCookie(ssid, username, expiration);
};

const initialState: UserState = {
  username: getCookie("username"),
  ssid: getCookie("ssid"),
  msg: "",
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserLogin: (
      state,
      action: { type: string; payload: UserLoginResponse }
    ) => {
      const { username, ssid, expiration, msg } = action.payload;
      setSession(state, { username, ssid, expiration });
      state.msg = msg;
    },
    setUserRegiser: (
      state,
      action: { type: string; payload: UserLoginResponse }
    ) => {
      const { username, ssid, expiration, msg } = action.payload;
      setSession(state, { username, ssid, expiration });
      state.msg = msg;
    },
    setMsg: (state, action: { type: string; payload: string | undefined }) => {
      if (action.payload === undefined) {
        state.msg = "";
      } else {
        state.msg = action.payload;
      }
    },
  },
});

export const { setUserLogin, setUserRegiser, setMsg } = slice.actions;
export default slice.reducer;

// expiration 會乘上1000倍，所以單位是秒
function setCookie(ssid: string, username: string, expiration: number) {
  var expires = new Date(Date.now() + expiration * 1000).toUTCString();
  document.cookie = `ssid=${ssid}; expires=${expires}; path=/`;
  document.cookie = `username=${username}; expires=${expires}; path=/`;
}

function getCookie(c_name: string): string {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + "=");
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(";", c_start);
      if (c_end === -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}

export const selectUser = (state: RootState) => state.user;
export const selectMsg = createSelector([selectUser], (user) => {
  return user.msg;
});
export const selectIsLogin = createSelector([selectUser], (user) => {
  return user.username !== "" && user.username !== "";
});

import { createSlice } from "@reduxjs/toolkit";
import { UserSession, UserState } from "../../types";

const initialState: UserState = {
  username: getCookie("username"),
  ssid: getCookie("ssid"),
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserSession: (state, action: { type: string; payload: UserSession }) => {
      const { username, ssid, expiration } = action.payload;
      console.log(action.payload);
      state.username = username;
      state.ssid = ssid;
      setCookie(ssid, username, expiration);
    },
  },
});

export const { setUserSession } = slice.actions;
export default slice.reducer;

// expiration 會乘上1000倍，所以單位是秒
function setCookie(ssid: string, username: string, expiration: number) {
  var expires = (new Date(Date.now()+ expiration*1000)).toUTCString();
  document.cookie = `ssid=${ssid}; expires=${expires}; path=/`;
  document.cookie = `username=${username}; expires=${expires}; path=/`;
}

function getCookie(c_name: string): string {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}

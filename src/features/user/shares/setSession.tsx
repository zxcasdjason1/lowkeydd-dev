import { UserSession, UserState } from "../../../app/types";
import { setCookie } from "./cookies";

export const setSession = (state: UserState, session: UserSession) => {
    const { username, ssid, expiration } = session;
    state.username = username;
    state.ssid = ssid;
    setCookie(ssid, username, expiration);
  };
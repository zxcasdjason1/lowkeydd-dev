import { UserLoginResponse, UserState } from "../../../app/types";
import { removeSessionCookie } from "../shares/cookies";

export const setUserLogout = (
  state: UserState,
  action: { type: string; payload: UserLoginResponse }
) => {
  const { username, ssid, msg } = action.payload;
  removeSessionCookie(ssid, username);
  state.username = "";
  state.ssid = "";
  state.msg = msg;
};

import { UserLoginResponse, UserState } from "../../../app/types";
import { setSession } from "../shares/setSession";

export const setUserLogin = (
  state: UserState,
  action: { type: string; payload: UserLoginResponse }
) => {
  const { username, ssid, expiration, msg } = action.payload;
  setSession(state, { username, ssid, expiration });
  state.msg = msg;
};

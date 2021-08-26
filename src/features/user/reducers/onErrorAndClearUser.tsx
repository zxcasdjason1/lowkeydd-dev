import { UserState } from "../../../app/types";
import { removeSessionCookie } from "../shares/cookies";

export const onErrorAndClearUser = (
  state: UserState,
  action: { type: string; payload: {msg:string} }
) => {
    // 把當前的User資訊都清掉
    const {msg} = action.payload
    const {ssid, username} = state;
    removeSessionCookie(ssid, username);
    state.username = "";
    state.ssid = "";
    // set msg
    state.msg = msg;
    
};

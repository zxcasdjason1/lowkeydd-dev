import { UserState } from "../../../app/types";
import { removeSessionCookie } from "../shares/cookies";

export const onFetchChannels = (
  state: UserState,
  action: { type: string; payload: { authMsg: string } }
) => {
  // 把當前的User資訊都清掉
  const { authMsg } = action.payload;
  if (state.username !== "" && authMsg === "AUTH_PASS") {
    // 代表使用者驗證通過仍保持連線。
    return;
  }
  // 驗證失敗，將user 清空
  const { ssid, username } = state;
  console.log("username:>", username, "authMsg:>", authMsg);
  removeSessionCookie(ssid, username);
  state.username = "";
  state.ssid = "";
};

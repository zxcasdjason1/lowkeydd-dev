import axios from "axios";
import { history } from "../../..";
import { API_SERVER_URL } from "../../../app/config";
import { UserLoginResponse } from "../../../app/types";
import { setMsg, setUserLogin } from "../slice";

export const reqLogin =
  (username: string, password: string) => (dispatch: any) => {
    // 產生登入的postform資料
    const postform = new FormData();
    postform.append("username", username);
    postform.append("password", password);

    // 發送Post請求
    axios.post(`${API_SERVER_URL}/auth/login`, postform).then(
      (resp) => {
        console.log("成功了, 回應如下:\n", resp.data);
        const code: string = resp.data["code"];
        const msg: string = resp.data["msg"];
        if (code === "success") {
          const { ssid, expiration } = resp.data["session"];
          const userLoginRes: UserLoginResponse = {
            username,
            ssid,
            expiration,
            msg,
          };
          dispatch(setUserLogin(userLoginRes));
          setTimeout(() => {
            history.push({ pathname: "/channels" });
            console.log("登入成功，直接跳轉到 channels");
          }, 1000);
        } else {
          dispatch(setMsg(msg));
        }
      },
      (err) => {
        console.log("失敗了, 錯誤如下:\n", err);
      }
    );
  };
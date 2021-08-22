import axios from "axios";
import { history } from "../../..";
import { API_SERVER_URL } from "../../../app/config";
import { UserLoginResponse } from "../../../app/types";
import { setMsg, setUserLogin } from "../slice";

export const reqLogout =
  (username: string, ssid: string) => (dispatch: any) => {

    // 產生登入的postform資料
    const postform = new FormData();
    postform.append("username", username);
    postform.append("ssid", ssid);

    // 發送Post請求
    axios.post(`${API_SERVER_URL}/auth/logout`, postform).then(
      (resp) => {
        console.log("成功了, 回應如下:\n", resp.data);
        const code: string = resp.data["code"];
        // const msg: string = resp.data["msg"];
        if (code === "success") {

          const userLoginRes: UserLoginResponse = {
            username:"",
            ssid:"",
            expiration: -1,
            msg:`${username} 已登出`,
          };
          dispatch(setUserLogin(userLoginRes));
          history.push({ pathname: "/login/" });

        } else {
          dispatch(setMsg(`${username} 登出失敗`));
          history.push({ pathname: "/logout/" });
        }
      },
      (err) => {
        dispatch(setMsg(`登出時發生異常，請重試`));
        console.log("失敗了, 錯誤如下:\n", err);
      }
    );
  };
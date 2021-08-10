import axios from "axios";
import { history } from "../../..";
import { API_SERVER_URL } from "../../../app/config";
import { UserRegisterResponse } from "../../../app/types";
import { setMsg, setUserRegister } from "../slice";

export const reqRegister =
  (username: string, password: string) => (dispatch: any) => {
    const postform = new FormData();
    postform.append("username", username);
    postform.append("password", password);
    axios.post(`${API_SERVER_URL}/auth/register`, postform).then(
      (resp) => {
        console.log("成功了, 回應如下:\n", resp.data);
        const code: string = resp.data["code"];
        const msg: string = resp.data["msg"];
        if (code === "success") {
          const { ssid, expiration } = resp.data["session"];
          const userRegisterRes: UserRegisterResponse = {
            username,
            ssid,
            expiration,
            msg,
          };
          dispatch(setUserRegister(userRegisterRes));
          setTimeout(() => {
            history.push({ pathname: "/channels" });
            console.log("註冊成功，直接跳轉到 channels");
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
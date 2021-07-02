import axios from "axios";
import { setUserSession } from "./slice";
import { history } from "../../index";
import { API_SERVER_URL } from "../../app/config";

export const reqLogin =
  (username: string, password: string) => (dispatch: any) => {
    const postform = new FormData();
    postform.append("username", username);
    postform.append("password", password);

    axios.post(`${API_SERVER_URL}/login`, postform).then(
      (resp) => {
        console.log("成功了, 回應如下:\n", resp.data);
        const code: string = resp.data["code"];
        const msg: string = resp.data["msg"];
        if (code === "success") {
          const { ssid, expiration } = resp.data["session"];
          const user = {
            username,
            ssid,
            expiration,
          };
          dispatch(setUserSession(user));
          history.push({ pathname: "/channels" });
          console.log("註冊成功，直接跳轉到 channels");
        }
      },
      (err) => {
        console.log("失敗了, 錯誤如下:\n", err);
      }
    );
  };

export const reqRegister =
  (username: string, password: string) => (dispatch: any) => {
    const postform = new FormData();
    postform.append("username", username);
    postform.append("password", password);
    axios.post(`${API_SERVER_URL}/register`, postform).then(
      (resp) => {
        console.log("成功了, 回應如下:\n", resp.data);
        const code: string = resp.data["code"];
        const msg: string = resp.data["msg"];
        if (code === "success") {
          const { ssid, expiration } = resp.data["session"];
          const user = {
            username,
            ssid,
            expiration,
          };
          dispatch(setUserSession(user));
          history.push({ pathname: "/channels" });
          console.log("註冊成功，直接跳轉到 channels");
        }
      },
      (err) => {
        console.log("失敗了, 錯誤如下:\n", err);
      }
    );
  };

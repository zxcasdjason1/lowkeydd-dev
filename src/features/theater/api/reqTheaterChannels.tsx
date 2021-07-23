import axios from "axios";
import { API_SERVER_URL } from "../../../app/config";
import { ChannelProps } from "../../../app/types";
import { setElements } from "../slice";

export const reqTheaterChannels =
  (tag: string) => (dispatch: any) => {
    axios.get(`${API_SERVER_URL}/channels/${tag}`).then(
      (resp) => {
        console.log("Theater請求成功了, 回應如下:\n", resp.data);
        const code: string = resp.data["code"];
        const channels: ChannelProps[] = resp.data["channels"];
        if (code === "success") {
          dispatch(setElements({ channels }));
        }
      },
      (err) => {
        console.log("Theater請求失敗了, 錯誤如下:\n", err);
      }
    );
  };

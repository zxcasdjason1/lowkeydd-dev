import axios from "axios";
import { API_SERVER_URL } from "../../../app/config";
import { ChannelProps, IframeProps } from "../../../app/types";
import { convertToIframeProps } from "../share";
import { setElements } from "../slice";

export const reqTheaterChannels =
  (tag: string, playlist:IframeProps[]) => (dispatch: any) => {
    axios.get(`${API_SERVER_URL}/channels/${tag}`).then(
      (resp) => {
        console.log("Theater請求成功了, 回應如下:\n", resp.data);
        const code: string = resp.data["code"];
        const channels: ChannelProps[] = resp.data["channels"];
        if (code === "success") {

          let sliderIndex: number = 1;

          const mp = new Map<string, boolean>();
          playlist.forEach(x=>mp.set(x.cid, true));

          // 透過playlist中的元素，對應elements進行修改
          const elements: IframeProps[] = channels.map((ch, i) => {
            if (mp.get(ch.cid)) {
              sliderIndex = (i+1);
              return {
                ...convertToIframeProps(ch),
                checked: true,
              };
            } else {
              return convertToIframeProps(ch);
            }
          });
          console.log("sliderIndex: ", elements, sliderIndex)
          dispatch(setElements({ elements, sliderIndex }));
        }
      },
      (err) => {
        console.log("Theater請求失敗了, 錯誤如下:\n", err);
      }
    );
  };

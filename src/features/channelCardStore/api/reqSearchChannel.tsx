/**
 * 透過關鍵字搜尋頻道
 */
import axios from "axios";
import {
  API_SERVER_URL,
  CHANNELS_SEARCH_ERROR,
  CHANNELS_SEARCH_FAILED,
  CHANNELS_SEARCH_RESULT,
} from "../../../app/config";
import { ChannelProps } from "../../../app/types";
import { createChannelCard } from "../shares";
import { setSearchResult } from "../slice";

export const reqSearchChannel = (url: string) => (dispatch: any) => {
  const postform = new FormData();
  postform.append("url", url);
  axios.post(`${API_SERVER_URL}/channels/search`, postform).then(
    (resp) => {
      console.log("[ChanelSearch]成功了, 回應如下:\n", resp.data);
      const code: string = resp.data["code"];
      const ch: ChannelProps = resp.data["channels"][0];

      switch (code) {
        case "success":
          console.log(`成功獲取頻道 ${ch.cname} \n`);
          dispatch(
            setSearchResult({
              current: createChannelCard(ch, {
                group: CHANNELS_SEARCH_RESULT,
                heart: false,
              }),
            })
          );
          break;
        case "failure":
          console.log(
            `獲取頻道 ${ch.cname} 失敗，請確認該頻道是否已經沒有內容或受到閱覽限制\n`
          );
          dispatch(
            setSearchResult({
              current: createChannelCard(
                { ...ch, status: "failure" },
                {
                  group: CHANNELS_SEARCH_ERROR,
                  heart: false,
                }
              ),
            })
          );
          break;
        default:
          console.log("作為搜尋頻道的連結格式有誤，請參考以下: \n");
          console.log("Youtube : https://www.youtube.com/channel/xxxxxxx\n");
          console.log("twitch  : https://www.twitch.tv/xxxxxx\n");
          dispatch(
            setSearchResult({
              current: createChannelCard(
                { ...ch, status: "error" },
                {
                  group: CHANNELS_SEARCH_FAILED,
                  heart: false,
                }
              ),
            })
          );
          break;
      }
    },
    (err) => {
      console.log("失敗了, 錯誤如下:\n", err);
    }
  );
};

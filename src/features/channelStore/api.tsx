import axios from "axios";
import { ChannelProps, VisitItem } from "../../app/types";
import { setChannelStore } from "./slice";
import { API_SERVER_URL } from "../../app/config";

export const fetchChannels =
  (username: string, ssid: string, tags: string[]) => (dispatch: any) => {
    const request = {
      username,
      ssid,
      tags,
    };

    // 避免tags為空
    if (tags.length === 0) {
      console.error("tags不可為空，此動作已被撤回");
      return;
    }

    // 搜尋內容為空時會被撤回
    if (tags[0] === "") {
      console.error("搜尋內容不可為空，此動作已被撤回");
      return;
    }

    console.log("getLetsddV2Channels, tags: ", [tags]);
    axios.post(`${API_SERVER_URL}/letsddv2`, request).then(
      (response) => {
        console.log("成功了, 回應如下:\n", response.data);
        const channels: Array<ChannelProps[]> = response.data["channels"];
        const group: string[] = response.data["group"];
        dispatch(setChannelStore({ channels, group, tags }));
      },
      (error) => {
        console.log("失敗了, 錯誤如下:\n", error);
      }
    );
  };

export const createVisitItem_from_ChannelProps = (
  ch: ChannelProps, group:string
): VisitItem => {
  const { cid, cname, avatar, owner, method } = ch;
  return { avatar, cid, cname, owner, group, method };
};

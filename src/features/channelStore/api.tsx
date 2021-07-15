import axios from "axios";
import { ChannelProps, VisitItem } from "../../app/types";
import { setChannelStore } from "./slice";
import {
  API_SERVER_URL,
  CHANNELS_DEFAULT_GROUPNAME,
  VISITS_DEFAULT_GROUPNAME,
} from "../../app/config";

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

        // 檢驗收到的資料，如果沒有傳送AUTH或驗證失敗，會收到空的group清單。

        if (group.length === 0 && channels.length === 1) {
          // 使用預設的群組名稱為此頻道來命名。
          dispatch(
            setChannelStore({
              channels,
              group: [CHANNELS_DEFAULT_GROUPNAME],
              tags,
            })
          );
        } else {
          // 使用收到的group清單。
          dispatch(
            setChannelStore({
              channels,
              group: group.concat(CHANNELS_DEFAULT_GROUPNAME),
              tags,
            })
          );
        }
      },
      (error) => {
        console.log("失敗了, 錯誤如下:\n", error);
      }
    );
  };

// 透過頻道入口點選"最愛"，放入收藏庫時，其群組名修改為收藏庫的預設名。
export const convertToVisitItem = (
  ch: ChannelProps,
  group: string
): VisitItem | null => {
  // 過濾掉群組名非預設的資料；因為其他群組名表示為使用者自行定義

  if (group !== CHANNELS_DEFAULT_GROUPNAME) {
    return null;
  } else {
    const { cid, cname, owner, avatar, method } = ch;
    return {
      cid,
      cname,
      owner,
      avatar,
      method,
      group: VISITS_DEFAULT_GROUPNAME,
    };
  }
};

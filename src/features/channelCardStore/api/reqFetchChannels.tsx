/**
 * 獲取頻道卡片群集(channels)、用戶收藏者清單(list)、頻道分群(group)
 */
import axios from "axios";
import {
  API_SERVER_URL,
  CHANNELS_DEFAULT_GROUPNAME,
  VISITS_DEFAULT_GROUPNAME,
} from "../../../app/config";
import { ChannelProps, VisitItem } from "../../../app/types";
import { setStore } from "../slice";

export const reqFetchChannels =
  (username: string, ssid: string, tags: string[]) => (dispatch: any) => {
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

    const request = new FormData();
    request.append("username", username);
    request.append("ssid", ssid);
    request.append("tags", JSON.stringify(tags));

    console.log("getLetsddV2Channels, tags: ", [tags]);
    axios.post(`${API_SERVER_URL}/letsdd/v2`, request).then(
      (response) => {
        console.log("成功了, 回應如下:\n", response.data);
        const channels: ChannelProps[][] = response.data["channels"];
        const group: string[] = response.data["group"];
        const list: VisitItem[] = response.data["list"];
 

        // 檢驗收到的資料，如果沒有傳送AUTH或驗證失敗，會收到空的group清單。

        if (group.length === 0 && channels.length === 1) {
          // 使用預設的群組名稱為此頻道來命名。
          dispatch(
            setStore({
              channels: [[], ...channels],
              group: [VISITS_DEFAULT_GROUPNAME, CHANNELS_DEFAULT_GROUPNAME],
              tags,
              list,
            })
          );
        } else {
          // 使用收到的group清單。
          dispatch(
            setStore({
              channels,
              group: group.concat(CHANNELS_DEFAULT_GROUPNAME),
              tags,
              list,
            })
          );
        }
      },
      (error) => {
        console.log("失敗了, 錯誤如下:\n", error);
      }
    );
  };

/**
 * 獲取頻道卡片群集(channels)、用戶收藏者清單(list)、頻道分群(group)
 */
import axios from "axios";
import { history } from "../../..";
import {
  API_SERVER_URL,
  CHANNELS_DEFAULT_GROUPNAME,
  VISITS_DEFAULT_GROUPNAME,
} from "../../../app/config";
import { ChannelProps, VisitItem } from "../../../app/types";
import { createFavoredItem } from "../../favored/shares/createFavoredItem";
import { setFavoredList } from "../../favored/slice";
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
    axios.post(`${API_SERVER_URL}/letsdd/v2`, request).then(
      (response) => {
        console.log("成功了, 回應如下:\n", response.data);
        const channels: ChannelProps[][] = response.data["channels"];
        const group: string[] = response.data["group"];
        const list: VisitItem[] = response.data["list"];

        /**
         * ChannelCards
         *
         *  1) 設置Channels。
         */
        dispatch(
          setStore({
            channels,
            group: group.concat(CHANNELS_DEFAULT_GROUPNAME),
            tags,
          })
        );

        /**
         * Facvored
         *
         *  1) 設置Favoredlist
         */
        dispatch(
          setFavoredList({
            group:
              group && group.length > 0
                ? group.includes(VISITS_DEFAULT_GROUPNAME)
                  ? group
                  : [VISITS_DEFAULT_GROUPNAME, ...group]
                : [VISITS_DEFAULT_GROUPNAME],
            list:
              list && list.length > 0
                ? list.map((l: VisitItem) =>
                    createFavoredItem(l, {
                      isChanged: false,
                      isDeleted: false,
                      isNewAdded: false,
                    })
                  )
                : [],
          })
        );
      },
      (error) => {
        console.log("失敗了, 錯誤如下:\n", error);
        setTimeout(() => {
          history.push({ pathname: "/channels/" });
        }, 1000);
      }
    );
  };

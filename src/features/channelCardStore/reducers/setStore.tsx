/**
 * 獲取頻道卡片跟用戶收藏者清單本是兩支api，合併成一個reqFetchChannels來一次性獲取後設置。
 */
import { CHANNELS_DEFAULT_GROUPNAME } from "../../../app/config";
import { ChannelCardStore, ChannelProps, VisitItem } from "../../../app/types";
import { createChannelCard, createFavoredItem } from "../shares";

export const setStore =(
  state: ChannelCardStore,
  action: {
    type: string;
    payload: {
      channels: ChannelProps[][];
      group: string[];
      list: VisitItem[];
      tags: string[];
    };
  }
) => {
  const { channels, group, list, tags } = action.payload;
  state.group = group;
  state.tags = tags[0] === "all" ? ["live", "wait", "off"] : tags;

  // 設置使用者個人的收藏清單
  if (list) {
    state.favoredList = list.map((v: VisitItem) =>
      createFavoredItem(v, {
        isChanged: false,
        isNewAdded: false,
        isDeleted: false,
      })
    );
  }

  // cluster
  setCluster(state, channels, group);
};

const setCluster = (
  state: ChannelCardStore,
  channels: ChannelProps[][],
  group: string[]
) => {
  const clusters = channels.map((chgroups, i) =>
    chgroups !== null
      ? chgroups.map((ch) =>
          createChannelCard(ch, {
            group: group[i],
            heart: group[i] !== CHANNELS_DEFAULT_GROUPNAME,
          })
        )
      : []
  );
  console.log("[ChannelCardStore] setCluster");
  state.clusters = clusters;
  state.hasFetchChannels = true;
};
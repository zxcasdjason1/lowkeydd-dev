import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  CHANNELS_DEFAULT_GROUPNAME,
  VISITS_DEFAULT_GROUPNAME,
} from "../../app/config";
import { RootState } from "../../app/store";
import {
  ChannelCardProps,
  ChannelProps,
  FavoredItem,
  VisitItem,
  VisitList,
} from "../../app/types";
import { createChannelCard, createFavoredItem, createVisitItem } from "./share";

type ChannelCardStore = {
  hasFetchChannels: boolean;
  clusters: ChannelCardProps[][];
  group: string[];
  favoredList: FavoredItem[];
  tags: string[];
  current: ChannelCardProps | null;
};

const initialState: ChannelCardStore = {
  hasFetchChannels: false,
  clusters: [[]],
  group: [],
  favoredList: [],
  tags: ["live"],
  current: null,
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

const slice = createSlice({
  name: "browser",
  initialState,
  reducers: {
    setStore: (
      state,
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
      // state.current = null;

      // list
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
    },
    setChannelCard: (
      state,
      action: {
        type: string;
        payload: {
          card: ChannelCardProps;
          options: {
            isChanged: boolean;
            isNewAdded: boolean;
            isDeleted: boolean;
          };
        };
      }
    ) => {
      const { card, options } = action.payload;
      const { isChanged, isNewAdded, isDeleted } = options;
      const prelist = state.favoredList;

      if (card.heart) {
        state.favoredList = [
          createFavoredItem(card, {
            isChanged,
            isNewAdded,
            isDeleted,
          }),
          ...prelist.filter((p) => p.cid !== card.cid),
        ];
      } else {
        if (isNewAdded) {
          // 對於還不是喜愛的頻道直接移除。
          state.favoredList = [...prelist.filter((p) => p.cid !== card.cid)];
        } else {
          // 對於已經加入喜愛的頻道視為刪除(劃線)。
          const newItem = createFavoredItem(card, {
            isChanged,
            isNewAdded,
            isDeleted: true,
          });
          state.favoredList = prelist.map((p) =>
            p.cid !== newItem.cid ? p : newItem
          );
        }
      }

      // 產生新的卡片群集
      state.clusters = state.clusters.map((cards: ChannelCardProps[]) =>
        cards.length !== 0
          ? cards.map((ch: ChannelCardProps) =>
              ch.cid !== card.cid ? ch : card
            )
          : []
      );
    },
    setFavoredList: (
      state,
      action: {
        type: string;
        payload: {
          group: string[] | null;
          list: FavoredItem[];
        };
      }
    ) => {
      const { group, list } = action.payload;
      if (group !== null) {
        state.group = group;
      }
      state.favoredList = list;

      // 無法透過新生成的List去推得新的卡片群集；
      // 必須在更新後發送請求，重新獲取新的clusters 和更新後的 List
    },
    setSearchResult: (
      state,
      action: {
        type: string;
        payload: { current: ChannelCardProps | null };
      }
    ) => {
      const { current } = action.payload;
      if (current !== null) {
        state.current = current;

        if (current.heart === true) {
          const newItem = createFavoredItem(
            { ...current, group: VISITS_DEFAULT_GROUPNAME }, //修正為合法的group屬性
            {
              isChanged: false,
              isNewAdded: true,
              isDeleted: false,
            }
          );
          state.favoredList = [newItem, ...state.favoredList];
        } else {
          state.favoredList = state.favoredList.filter(
            (f) => f.cid !== current.cid
          );
        }
      }
    }
  },
});

export const {
  setStore,
  setChannelCard,
  setFavoredList,
  setSearchResult,
} = slice.actions;
export default slice.reducer;

export const selectChannelCardStore = (state: RootState) =>
  state.channelCardStore;

export const selectHasFetchChannels = createSelector(
  [selectChannelCardStore],
  (store) => store.hasFetchChannels
);

export const selectChannelsCluster = createSelector(
  [selectChannelCardStore],
  (store) => store.clusters
);

export const selectTags = createSelector(
  [selectChannelCardStore],
  (store) => store.tags
);

export const selectGroup = createSelector(
  [selectChannelCardStore],
  (store) => store.group
);

export const selectFavoredList = createSelector(
  [selectChannelCardStore],
  (store) => store.favoredList
);

export const selectCurrent = createSelector(
  [selectChannelCardStore],
  (store) => store.current
);

export const selectVisitList = createSelector(
  [selectFavoredList],
  (favoredList) => {
    const newfavoredList = favoredList
      // 刪除
      .filter((f) => !f.isDeleted)
      // 修正群主名稱 Resident => Favorite
      .map((f) =>
        f.group === CHANNELS_DEFAULT_GROUPNAME
          ? { ...f, group: VISITS_DEFAULT_GROUPNAME }
          : f
      );

    // 刪除多餘沒被使用到的群組名稱
    const mp = new Map<string, boolean>();
    const newGroup: string[] = [];
    newfavoredList.forEach((f: FavoredItem) => {
      if (!mp.has(f.group)) {
        mp.set(f.group, true);
        newGroup.push(f.group);
      }
    });

    // 轉成VisitItem表單。
    const list: VisitItem[] = newfavoredList.map((f) => createVisitItem(f));

    // 輸出結果
    const visit: VisitList = {
      list,
      group: newGroup,
    };
    return visit;
  }
);

export const selectFavoredCardsList = createSelector(
  [selectGroup, selectFavoredList],
  (group, favoredList) => {
    if (group.length === 0) {
      return [[]];
    }

    const result: FavoredItem[][] = group.map((x) => []);
    favoredList.forEach((f: FavoredItem) => {
      const index = group.indexOf(f.group);
      result[index].push(f);
    });

    return result;
  }
);

export const selectIsFavoredCardsListChanged = createSelector(
  [selectFavoredList],
  (favoredList) => {
    var isListChanged = false;
    const len = favoredList.length;
    for (let i = 0; i < len; i++) {
      const { isChanged, isNewAdded, isDeleted } = favoredList[i];
      if (isChanged || isNewAdded || isDeleted) {
        isListChanged = true;
        break;
      }
    }
    return isListChanged;
  }
);

export const selectNumOfFavoredCards = createSelector(
  [selectFavoredList],
  (favoredList) => {
    var count = 0;
    const len = favoredList.length;
    for (let i = 0; i < len; i++) {
      const { isNewAdded } = favoredList[i];
      if (isNewAdded) {
        count += 1;
      }
    }
    return count;
  }
);

// export const selectFavoredList = createSelector([selectChannelCardStore], (store) => {
//   return store.favoredList;
// });

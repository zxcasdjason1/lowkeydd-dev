import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ChannelProps, ChannelStoreState, VisitItem } from "../../app/types";

const initialState: ChannelStoreState = {
  current: null,
  group: [],
  favored: [], // 保存獲取到的頻道
  tags: ["live"],
  view: [[]], //產生二維陣列,
  list: [],
};

const slice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setChannelStore: (
      state,
      action: {
        type: string;
        payload: {
          channels: ChannelProps[][];
          group: string[];
          tags: string[];
        };
      }
    ) => {
      const { channels, group, tags } = action.payload;
      state.view = channels;
      state.group = group;
      state.tags = tags[0] === "all" ? ["live", "wait", "off"] : tags;
    },
    setFavored: (
      state,
      action: {
        type: string;
        payload: {
          item: VisitItem;
        };
      }
    ) => {
      const { item } = action.payload;
      const favored = state.favored;
      state.favored = [item, ...favored.filter((f) => f.cid !== item.cid)];
    }
  },
});

export const { setChannelStore, setFavored } = slice.actions;
export default slice.reducer;

export const selectChannelStore = (state: RootState) => state.channelStore;
export const selectChannelGroupedView = createSelector(
  [selectChannelStore],
  (store) => store.view
);
export const selectChannelTags = createSelector(
  [selectChannelStore],
  (store) => store.tags
);
export const selectChannelGroup = createSelector(
  [selectChannelStore],
  (store) => store.group
);
export const selectFavoredChannels = createSelector(
  [selectChannelStore],
  (store) => store.favored
);
export const selectChannels = createSelector(
  [selectChannelGroupedView],
  (view) =>
    view.reduce((newArr: ChannelProps[], channels: ChannelProps[]) => {
      return newArr.concat(channels);
    }, [])
);

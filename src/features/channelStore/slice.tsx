import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getGroupMap, getGroupedView } from "../../app/share";
import { RootState } from "../../app/store";
import { ChannelProps, ChannelStoreState, VisitList } from "../../app/types";

const initialState: ChannelStoreState = {
  group: [],
  tags: ["live"],
  view: [0].map((x) => []), //產生二維陣列
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
  },
});

export const { setChannelStore } = slice.actions;
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
export const selectChannels = createSelector(
  [selectChannelGroupedView],
  (view) =>
    view.reduce((newArr: ChannelProps[], channels: ChannelProps[]) => {
      return newArr.concat(channels);
    }, [])
);

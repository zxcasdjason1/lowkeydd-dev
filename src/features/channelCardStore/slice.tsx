import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ChannelCardStore } from "../../app/types";
import * as reducers from "./reducers";

const initialState: ChannelCardStore = {
  hasFetchChannels: false,
  clusters: [[]],
  group: [],
  favoredList: [],
  tags: ["live"],
  current: null,
};

const slice = createSlice({
  name: "channelCardStore",
  initialState,
  reducers,
});

export const { setStore, setChannelCard, setFavoredList, setSearchResult } =
  slice.actions;

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

export const selectCurrent = createSelector(
  [selectChannelCardStore],
  (store) => store.current
);

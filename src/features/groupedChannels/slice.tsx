import { createSlice } from "@reduxjs/toolkit";
import { getGroupMap, getView } from "../../app/share";
import {
  ChannelProps,
  GroupedChannelsType,
  VisitList,
} from "../../types/index";

const TAG_ALL = ["live","wait","off"]

const initialState: GroupedChannelsType = {
  visitGroup: [],
  view: [],
  tags: ["off"],
};

const slice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setFavored: (
      state,
      action: {
        type: string;
        payload: { visit: VisitList; channels: ChannelProps[] };
      }
    ) => {
      const { visit, channels } = action.payload;
      const len = visit.group.length;
      if (len === 0) {
        state.view = [channels];
        // state.resident = channels;
        return;
      }
      const mp = getGroupMap(visit.list);
      const group = visit.group;
      const view = getView(mp, group, channels, true);
      // state.visitMap = mp;
      state.visitGroup = visit.group;
      state.view = view;
      // state.resident = view[len];
    },
    setLetddV2: (state, action: { type: string; payload: {channels: ChannelProps[][], group: string[], tags:string[]} }) => {
      const {channels, group,tags} = action.payload
      state.view = channels
      state.visitGroup = group
      state.tags = tags[0] == "all" ? ["live","wait","off"]
      : tags
    },
  },
});

export const { setFavored, setLetddV2} = slice.actions;
export default slice.reducer;

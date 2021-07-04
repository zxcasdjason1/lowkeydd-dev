import { createSlice } from "@reduxjs/toolkit";
import { getGroupMap, getView } from "../../app/share";
import {
  ChannelProps,
  GroupedChannelsType,
  VisitList,
} from "../../types/index";

const initialState: GroupedChannelsType = {
  visitMap: {},
  visitGroup: [],
  view: [],
  resident: [],
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
        state.resident = channels;
        return;
      }
      const mp = getGroupMap(visit.list);
      const group = visit.group;
      const view = getView(mp, group, channels, true);
      state.visitMap = mp;
      state.visitGroup = visit.group;
      state.view = view;
      state.resident = view[len];
    },
    setResident: (state, action: { type: string; payload: ChannelProps[] }) => {
      const channels = action.payload;
      const { visitGroup, visitMap } = state;
      const len = visitGroup.length;
      if (len === 0) {
        state.view = [channels];
        state.resident = channels;
        return;
      }
      const view = getView(visitMap, visitGroup, channels, true);
      state.view = view;
      state.resident = view[len];
    },
  },
});

export const { setFavored, setResident } = slice.actions;
export default slice.reducer;

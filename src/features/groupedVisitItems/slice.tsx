import { createSlice } from "@reduxjs/toolkit";
import { getGroupMap, getView } from "../../app/share";
import {
  VisitList,
  VisitItem,
  GroupedVisitItemsType,
  ChannelProps,
} from "../../types";

const initialState: GroupedVisitItemsType = {
  group: [],
  list: [],
  groupMap: {},
  view: [],
  current: null,
};

const slice = createSlice({
  name: "visitlist",
  initialState,
  reducers: {
    setWholeVisit: (state, action: { type: string; payload: VisitList }) => {
      const { group, list } = action.payload;
      const mp = getGroupMap(list);
      state.group = group;
      state.list = list;
      state.groupMap = mp;
      state.view = getView(mp, group, list, false);
    },
    setVisitList: (state, action: { type: string; payload: VisitItem[] }) => {
      const list = action.payload;
      const mp = getGroupMap(list);
      state.list = list;
      state.groupMap = mp;
      state.view = getView(mp, state.group, list, false);
    },
    setSearchResult: (
      state,
      action: {
        type: string;
        payload: { list: VisitItem[]; group: string[]; current: ChannelProps };
      }
    ) => {
      const { group, list, current } = action.payload;
      const mp = getGroupMap(list);
      state.group = group;
      state.list = list;
      state.groupMap = mp;
      state.view = getView(mp, group, list, false);
      state.current = current;
    },
  },
});

export const { setWholeVisit, setVisitList, setSearchResult } = slice.actions;
export default slice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getGroupMap, getView } from "../../app/share";
import { VisitList, VisitItem, GroupedVisitItemsType } from "../../types";

const initialState: GroupedVisitItemsType = {
  group: [],
  list: [],
  groupMap:{},
  view:[],
};

const slice = createSlice({
  name: "visitlist",
  initialState,
  reducers: {
    setWholeVisit: (state, action: { type: string; payload: VisitList }) => {
      const {group, list} = action.payload
      const mp = getGroupMap(list)
      state.group = group;
      state.list = list;
      state.groupMap = mp;
      state.view = getView(mp, group, list, false);
    },
    setVisitList: (state, action: { type: string; payload: VisitItem[] }) => {
      const list = action.payload
      const mp = getGroupMap(list)
      state.list = list;
      state.groupMap = mp;
      state.view = getView(mp, state.group, list, false);
    },
    addVisitItem: (state, action: { type: string; payload: VisitItem }) => {
      const list = [action.payload, ...state.list];
      const mp = getGroupMap(list)
      state.list = list;
      state.groupMap = mp;
      state.view = getView(mp, state.group, list, false);
    },
  },
});

export const { setWholeVisit, setVisitList, addVisitItem } =
  slice.actions;
export default slice.reducer;

import { createSelector, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "../../app/hooks";
import { getGroupedView, getGroupMap} from "../../app/share";
import { RootState } from "../../app/store";
import {
  VisitList,
  VisitItem,
  visitStoreState,
  ChannelProps,
} from "../../app/types";

const initialState: visitStoreState = {
  group: [],
  list: [],
  // groupMap: {},
  // view: [],
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
      // state.groupMap = mp;
      // state.view = getView(mp, group, list, false); 
    },
    setVisitList: (state, action: { type: string; payload: VisitItem[] }) => {
      const list = action.payload;
      // const mp = getGroupMap(list);
      state.list = list;
      // state.groupMap = mp;
      // state.view = getView(mp, state.group, list, false);
    },
    setSearchResult: (
      state,
      action: {
        type: string;
        payload: { list: VisitItem[]; group: string[]; current: ChannelProps };
      }
    ) => {
      const { group, list, current } = action.payload;
      // const mp = getGroupMap(list);
      state.group = group;
      state.list = list;
      // state.groupMap = mp;
      // state.view = getView(mp, group, list, false);
      state.current = current;
    },
  },
});

export const { setWholeVisit, setVisitList, setSearchResult } = slice.actions;
export default slice.reducer;

export const selectVisitStore = (state: RootState):visitStoreState => state.visitStore;

export const selectVisitGroup = createSelector(
  [selectVisitStore],
  (visitStore) => visitStore.group
);
export const selectVisitList = createSelector(
  [selectVisitStore],
  (visitStore) => visitStore.list
);
export const selectVisitGroupMap = createSelector(
  [selectVisitList],
  (list) => getGroupMap(list)
);
export const selectVisitGroupedView = createSelector(
  [selectVisitGroupMap, selectVisitGroup, selectVisitList],
  (mp, group, list) => getGroupedView(mp, group, list, false)
);

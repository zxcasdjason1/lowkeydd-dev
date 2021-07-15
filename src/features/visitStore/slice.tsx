import { createSelector, createSlice } from "@reduxjs/toolkit";
import { VISITS_DEFAULT_GROUPNAME } from "../../app/config";
import { getGroupMap } from "../../app/share";
import { RootState } from "../../app/store";
import {
  VisitList,
  VisitItem,
  visitStoreState,
  ChannelProps,
} from "../../app/types";

const initialState: visitStoreState = {
  group: [VISITS_DEFAULT_GROUPNAME],
  current: null,
  list: [],
  favored: [],
  isListChanged: false,
};

const slice = createSlice({
  name: "visitlist",
  initialState,
  reducers: {
    editList: (state, action: { type: string; payload: VisitList }) => {
      const { group, list } = action.payload;
      state.group = group;
      state.list = list;
    },
    updateList: (state, action: { type: string; payload: VisitList }) => {
      const { group, list } = action.payload;
      state.group = group;
      state.list = list;
      state.isListChanged = false;
      state.favored = []; // 更新完後重置 favored
    },
    editVisitList: (state, action: { type: string; payload: {list:VisitItem[], group:string[]|null} }) => {
      const { group, list } = action.payload;
      if (group !== null){
        state.group = group;
      }
      state.list = list;
      state.isListChanged = true;
    },
    setSearchResult: (
      state,
      action: {
        type: string;
        payload: { list: VisitItem[]; group: string[]; current: ChannelProps };
      }
    ) => {
      const { group, list, current } = action.payload;
      state.group = group;
      state.list = list;
      state.current = current;
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
    },
    removeFavored: (
      state,
      action: {
        type: string;
        payload: string;
      }
    ) => {
      const cid = action.payload;
      const favored = state.favored;
      state.favored = favored.filter((f) => f.cid !== cid);
    }
  },
});

export const {
  editList,
  updateList,
  setSearchResult,
  editVisitList,
  setFavored,
  removeFavored,
} = slice.actions;
export default slice.reducer;

export const selectVisitStore = (state: RootState): visitStoreState =>
  state.visitStore;

export const selectVisitGroup = createSelector(
  [selectVisitStore],
  (visitStore) => visitStore.group
);
export const selectList = createSelector(
  [selectVisitStore],
  (visitStore) => visitStore.list
);
export const selectIsListChanged = createSelector(
  [selectVisitStore],
  (visitStore) => visitStore.isListChanged
);
export const selectListMap = createSelector([selectList], (list) => {
  const mp = new Map<string, boolean>();
  list.forEach((l) => mp.set(l.cid, true));
  return mp;
});
export const selectFavoredList = createSelector(
  [selectVisitStore],
  (visitStore) => visitStore.favored
);
export const selectFavoredListMap = createSelector(
  [selectFavoredList],
  (favored) => {
    const mp = new Map<string, boolean>();
    favored.forEach((f) => mp.set(f.cid, true));
    return mp;
  }
);
export const selectVisitGroupMap = createSelector([selectList], (list) =>
  getGroupMap(list)
);
export const selectVisitGroupedView = createSelector(
  [selectVisitGroupMap, selectVisitGroup, selectList],
  (mp, group, list) => createVisitGroupedView(mp, group, list)
);

const createVisitGroupedView = (
  mp: { [key: string]: string },
  group: string[],
  list: VisitItem[]
): VisitItem[][] => {
  if (!list || list.length === 0) {
    return Array(1)
      .fill(0)
      .map((x) => []);
  }

  if (!group || group.length === 0) {
    return Array(1)
      .fill(0)
      .map((x) => []);
  }

  const len = group.length;
  const view: VisitItem[][] = Array(len)
    .fill(0)
    .map((x) => []);

  list.forEach((o: VisitItem) => {
    const groupName = mp[o.cid];
    const ix = groupName ? group.indexOf(groupName) : -1;
    if (ix > -1) {
      view[ix].push(o);
    } else {
      view[len].push(o);
    }
  });
  return view;
};

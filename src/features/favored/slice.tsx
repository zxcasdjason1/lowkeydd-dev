import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  FavoredCardStore,
  FavoredItem,
  VisitItem,
  VisitList,
} from "../../app/types";
import { RootState } from "../../app/store";
import {
  CHANNELS_DEFAULT_GROUPNAME,
  VISITS_DEFAULT_GROUPNAME,
} from "../../app/config";
import { createVisitItem } from "../channelCardStore/shares";
import * as reducers from "./reducers";

const initialState: FavoredCardStore = {
  group: [],
  favoredList: [],
};

const slice = createSlice({
  name: "favored",
  initialState,
  reducers,
});

export const { setFavoredList, setFromChannelCard } = slice.actions;
export default slice.reducer;

const selectFavoredCardStore = (state: RootState) => state.favored;

export const selectFavoredList = createSelector(
  [selectFavoredCardStore],
  (store) => store.favoredList
);

export const selectGroup = createSelector(
  [selectFavoredCardStore],
  (store) => store.group
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

export const selectIsListChanged = createSelector(
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

export const selectNumOfNewAdded = createSelector(
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

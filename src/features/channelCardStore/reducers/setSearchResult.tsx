/**
 * 透過搜尋功能，顯示頻道搜尋結果
 */
import { VISITS_DEFAULT_GROUPNAME } from "../../../app/config";
import { ChannelCardProps, ChannelCardStore } from "../../../app/types";
import { createFavoredItem } from "../shares";

export const setSearchResult = (
  state: ChannelCardStore,
  action: {
    type: string;
    payload: { current: ChannelCardProps | null };
  }
) => {
  const { current } = action.payload;
  if (current !== null) {
    state.current = current;

    // 將搜尋結果卡片設置為最愛時，已預設的分群名稱添加進收藏清單。
    if (current.heart === true) {
      const newItem = createFavoredItem(
        { ...current, group: VISITS_DEFAULT_GROUPNAME },
        {
          isChanged: false,
          isNewAdded: true,
          isDeleted: false,
        }
      );
      state.favoredList = [newItem, ...state.favoredList];
    } else {
      state.favoredList = state.favoredList.filter(
        (f) => f.cid !== current.cid
      );
    }
  }
};

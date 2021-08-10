/**
 * 設置使用者頻道收藏清單 
 */
import { ChannelCardStore, FavoredItem } from "../../../app/types";

export const setFavoredList = (
  state: ChannelCardStore,
  action: {
    type: string;
    payload: {
      group: string[] | null;
      list: FavoredItem[];
    };
  }
) => {
  const { group, list } = action.payload;
  if (group !== null) {
    state.group = group;
  }
  state.favoredList = list;
};

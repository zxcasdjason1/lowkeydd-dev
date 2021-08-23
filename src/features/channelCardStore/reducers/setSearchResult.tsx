/**
 * 透過搜尋功能，顯示頻道搜尋結果
 */
import { ChannelCardProps, ChannelCardStore } from "../../../app/types";
export const setSearchResult = (
  state: ChannelCardStore,
  action: {
    type: string;
    payload: { current: ChannelCardProps | null };
  }
) => {
  state.current = action.payload.current;
};

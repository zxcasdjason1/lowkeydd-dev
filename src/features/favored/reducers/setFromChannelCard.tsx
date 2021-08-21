import { ChannelCardProps, FavoredCardStore } from "../../../app/types";
import { createFavoredItem } from "../shares/createFavoredItem";

export const setFromChannelCard = (
  state: FavoredCardStore,
  action: {
    type: string;
    payload: {
      card: ChannelCardProps;
      options: {
        isChanged: boolean;
        isNewAdded: boolean;
        isDeleted: boolean;
      };
    };
  }
) => {
  const { card, options } = action.payload;
  const { isChanged, isNewAdded, isDeleted } = options;
  const prelist = state.favoredList;

  if (card.heart) {
    state.favoredList = [
      createFavoredItem(card, {
        isChanged,
        isNewAdded,
        isDeleted,
      }),
      ...prelist.filter((p) => p.cid !== card.cid),
    ];
  } else {
    if (isNewAdded) {
      // 對於還不是喜愛的頻道直接移除。
      state.favoredList = prelist.filter((p) => p.cid !== card.cid);
    } else {
      // 對於已經加入喜愛的頻道視為刪除(劃線)。
      const newItem = createFavoredItem(card, {
        isChanged,
        isNewAdded,
        isDeleted: true,
      });
      state.favoredList = prelist.map((p) =>
        p.cid !== newItem.cid ? p : newItem
      );
    }
  }
};

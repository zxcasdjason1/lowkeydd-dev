/**
 * 改變瀏覽頁面上的頻道卡片狀態，例如將某張卡片加到最愛時。
 */
import { ChannelCardProps, ChannelCardStore } from "../../../app/types";
import { createFavoredItem } from "../shares";

export const setChannelCard = (
  state: ChannelCardStore,
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
      state.favoredList = [...prelist.filter((p) => p.cid !== card.cid)];
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

  // 產生新的卡片群集
  state.clusters = state.clusters.map((cards: ChannelCardProps[]) =>
    cards.length !== 0
      ? cards.map((ch: ChannelCardProps) => (ch.cid !== card.cid ? ch : card))
      : []
  );
};

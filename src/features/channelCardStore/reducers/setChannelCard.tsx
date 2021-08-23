/**
 * 改變瀏覽頁面上的頻道卡片狀態，例如將某張卡片加到最愛時。
 */
import { ChannelCardProps, ChannelCardStore } from "../../../app/types";

export const setChannelCard = (
  state: ChannelCardStore,
  action: {
    type: string;
    payload: { card: ChannelCardProps };
  }
) => {
  const { card } = action.payload;

  // 產生新的卡片群集
  state.clusters = state.clusters.map((cards: ChannelCardProps[]) =>
    cards.length !== 0
      ? cards.map((ch: ChannelCardProps) => (ch.cid !== card.cid ? ch : card))
      : []
  );
};

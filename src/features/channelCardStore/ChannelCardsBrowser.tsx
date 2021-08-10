import { useSelector } from "../../app/hooks";
import { selectChannelCardStore } from "./slice";
import { ChannelCardsGroup } from "./ChannelCardsGroup";
import { ChannelCardProps } from "../../app/types";
import { Fragment } from "react";

/**
 * 瀏覽頻道，顯示當前可被瀏覽頻道內容。
 */
export function ChannelCardsBrowser() {
  const { group, clusters } = useSelector(selectChannelCardStore);
  const view = clusters.filter((cs) => cs !== null);

  return (
    <>
      {view.map((cards, i) =>
        // 透過group查找出對應的分群
        GetChannelCardsGroup(cards, group[i])
      )}
    </>
  );
}

const GetChannelCardsGroup = (
  cards: ChannelCardProps[],
  groupName: string
): JSX.Element => {
  if (cards.length === 0) {
    return <Fragment key={"ChannelCardsGroup_" + groupName} />;
  } else {
    return (
      <ChannelCardsGroup
        key={"ChannelCardsGroup_" + groupName}
        cards={cards}
        groupName={groupName}
      />
    );
  }
};

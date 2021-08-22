import { useSelector } from "../../app/hooks";
import { selectChannelsInGroup, selectGroup } from "./slice";
import { ChannelCardsGroup } from "./ChannelCardsGroup";
import { ChannelCardProps } from "../../app/types";
import { Fragment } from "react";
// import { useEffect } from "react";
// import { selectUser } from "../user/slice";
// import { selectIsListChanged, selectVisitList } from "../favored/slice";
// import { reqUpdateVisit } from "../favored/api";


/**
 * 瀏覽頻道，顯示當前可被瀏覽頻道內容。
 */
export function ChannelCardsBrowser() {
  const group = useSelector(selectGroup);
  const channelsInGroup = useSelector(selectChannelsInGroup);
  // const isListChanged = useSelector(selectIsListChanged);
  // const user = useSelector(selectUser);
  // const visit = useSelector(selectVisitList);
  // const dispatch = useDispatch();

  // const autoSaved = useCallback(() => {
  //   const { username, ssid } = user;
  //   if (isListChanged) {
  //     dispatch(reqUpdateVisit(username, ssid, visit));
  //   }
  // }, [dispatch, isListChanged, user, visit]);

  // useEffect(() => {
  //   // 每次畫面更新時，n 秒後檢查IsListChanged，並自動保存。
  //   let handler: any = null;
  //   if (handler) {
  //     clearTimeout(handler);
  //   }
  //   handler = setTimeout(autoSaved, 1000);
  //   return () => {
  //     if (handler) {
  //       clearTimeout(handler);
  //     }
  //   };
  // }, [autoSaved]);

  return (
    <>
      {channelsInGroup.map((cards, i) =>
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

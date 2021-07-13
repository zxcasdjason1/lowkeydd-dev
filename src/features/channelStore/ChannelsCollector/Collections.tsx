import { useSelector } from "../../../app/hooks";
import { selectVisitGroupedView } from "../../visitStore/slice";
import { VisitItem } from "../../../app/types";
import { GroupVisitItems } from "../../visitStore/GroupVisitItem";
import { selectChannelGroup } from "../slice";
import { Fragment } from "react";
import { getApprovedGroupName } from "../../../app/share";

export function ChannelsCollections() {
  const view = useSelector(selectVisitGroupedView);
  const group = useSelector(selectChannelGroup);

  console.log("ChannelsCollections", { view });

  return (
    <>
      {view.map((items: VisitItem[], i: number) => {
        // 驗證groupname
        const groupName = getApprovedGroupName(group[i]);
        // 根據分群顯示
        return items.length > 0 ? (
          <GroupVisitItems
            key={"GroupVisitItems_" + groupName}
            items={items}
            groupName={groupName}
          />
        ) : (
          <Fragment />
        );
      })}
    </>
  );
}

import { useSelector } from "../../../app/hooks";
import { selectVisitGroup, selectVisitGroupedView } from "../../visitStore/slice";
import { VisitItem } from "../../../app/types";
import { GroupVisitItems } from "../../visitStore/GroupVisitItem";
import { Fragment } from "react";

export function ChannelsCollections() {
  const view = useSelector(selectVisitGroupedView);
  const group = useSelector(selectVisitGroup);

  console.log("ChannelsCollections", { view });

  return (
    <>
      {view.map((items: VisitItem[], i: number) => {
        // 驗證groupname
        const groupName = group[i];
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

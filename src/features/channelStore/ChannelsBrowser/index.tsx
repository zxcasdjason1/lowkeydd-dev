import { useSelector } from "../../../app/hooks";
import { Fragment } from "react";
import { selectChannelStore } from "../slice";
import { GroupChannels } from "./GroupChannels";

/**
 * 以分群排列的方式，將各直播頻道入口呈現出來
 */
export function ChannelsBrowser() {
  const { group, view } = useSelector(selectChannelStore);
  console.log("ChannelsBrowser");

  return (
    <>
      {view.map((channels, i) => {

        // 收到的頻道資料會透過group清單，以此查找出其所對應的組別
        // 假如該頻道
        const groupName = group[i];

        return channels !== null ? (
          <GroupChannels
            key={"GroupChannels_" + groupName}
            channels={channels}
            groupName={groupName}
          />
        ) : (
          <Fragment key={"Fragment_" + groupName} />
        );
      })}
    </>
  );
}

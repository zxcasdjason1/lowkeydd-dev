import { useEffect } from "react";
import { useSelector, useDispatch } from "../../../app/hooks";
import  SympleChannelCard  from "../../../components/SympleChannelCard";
import { ChannelProps } from "../../../types";
import styled from "styled-components";
import { getLetsddV2Channels } from "../api";
import { Fragment } from "react";

export function FavoredChannels() {
  const { view, visitGroup, tags } = useSelector((state) => state.groupedChannels);
  const { username, ssid } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log("view: ", { view });
  console.log("visitGroup: ", { visitGroup });

  useEffect(() => {
    // 透過當前路徑去解析，取得要獲取的資源標籤
    dispatch(getLetsddV2Channels(username, ssid, tags));
    return () => {
      // componentWillUnmount
    };
  }, [dispatch]);

  return (
    <>
      {view.map((channels, i) =>
        channels !== null ? (
          <GroupChannels
            key={"GroupChannels_" + visitGroup[i]}
            channels={channels}
            groupName={visitGroup[i]}
          />
        ) : (
          <Fragment key={"Fragment_" + visitGroup[i]}/>
        )
      )}
    </>
  );
}

function GroupChannels(props: { channels: ChannelProps[]; groupName: string }) {
  const { channels, groupName } = props;

  return (
    <>
      <p>{groupName || "resident"}</p>
      <ChannelGridCantainer key={"ChannelGridCantainer_" + groupName}>
        {channels.map((ch: ChannelProps) => (
          <SympleChannelCard key={ch.cid} {...ch} />
        ))}
      </ChannelGridCantainer>
    </>
  );
}

const ChannelGridCantainer = styled.div`
  display: grid;
  grid-gap: 4px;
  grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
  align-items: center;
`;

import { useEffect } from "react";
import { useSelector, useDispatch } from "../../../app/hooks";
import Channel from "../../../components/Channel";
import { ChannelProps } from "../../../types";
import styled from "styled-components";
import { getFavoredChannels, getResidentChannels } from "../api";
import { Fragment } from "react";

export function FavoredChannels() {
  const { view, visitGroup } = useSelector((state) => state.groupedChannels);
  const { username, ssid } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log("view: ", { view });
  console.log("visitGroup: ", { visitGroup });

  useEffect(() => {
    if (ssid == "") {
      dispatch(getResidentChannels("all"));
      return;
    }
    // 透過當前路徑去解析，取得要獲取的資源標籤
    dispatch(getFavoredChannels(username, ssid));
    return () => {
      // componentWillUnmount
    };
  }, [dispatch]);

  return (
    <>
      {view.map((channels, i) =>
        channels.length > 0 ? (
          <GroupChannels
            key={"GroupChannels_" + visitGroup[i]}
            channels={channels}
            groupName={visitGroup[i]}
          />
        ) : (
          <Fragment />
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
      <ChannelGridCantainer>
        {channels.map((ch: ChannelProps) => (
          <Channel key={ch.cid} {...ch} />
        ))}
      </ChannelGridCantainer>
    </>
  );
}

const ChannelGridCantainer = styled.div`
  display: grid;
  grid-gap: 6px;
  grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
  align-items: center;
`;

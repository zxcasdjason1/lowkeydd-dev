import { useEffect } from "react";
import { useSelector, useDispatch } from "../../../app/hooks";
import ChannelCard from "../../../components/ChannelCard";
import { ChannelProps } from "../../../types";
import styled from "styled-components";
import { getLetsddV2Channels } from "../api";
import { Fragment } from "react";

export function FavoredChannels() {
  const { view, visitGroup, tags } = useSelector(
    (state) => state.groupedChannels
  );
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
          <Fragment key={"Fragment_" + visitGroup[i]} />
        )
      )}
    </>
  );
}

function GroupChannels(props: { channels: ChannelProps[]; groupName: string }) {
  const { channels, groupName } = props;

  return (
    <>
      <GroupLine><span>{groupName || "resident"}</span></GroupLine>
      <ChannelGridCantainer key={"ChannelGridCantainer_" + groupName}>
        {channels.map((ch: ChannelProps) => (
          <ChannelCard key={ch.cid} {...ch} />
        ))}
      </ChannelGridCantainer>
    </>
  );
}

const ChannelGridCantainer = styled.div`
  @media (min-width: 360px) {
    display: grid;
    grid-gap: 4px;
    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
    justify-content: center;
    align-items: center;
  }
`;

const GroupLine = styled.h1`

  --navColor: #4c4a46;
  --btnHoverColor: rgb(25, 133, 161);
  --btnHoverBgColor: rgba(25, 133, 161, 0.5);
  --toogleColor: #fff;
  --bkgColor: #fff;

  margin: 20px 0 10px 0;
  position: relative;
  text-align: center;
  font-size: 22px;
  letter-spacing: 2px;
  text-transform:uppercase;
  z-index: 1;
  ::before {
    content: "";
    display: block;
    width: 50%;
    height: 2px;
    background-color: var(--btnHoverColor);
    position: absolute;
    left: 0;
    top: 50%;
    z-index: -1;
  }
  ::after {
    content: "";
    display: block;
    width: 50%;
    height: 2px;
    background-color: var(--btnHoverColor);
    position: absolute;
    right: 0;
    top: 50%;
    z-index: -1;
  }
  span {
    padding: 0 10px;
    color: var(--btnHoverColor);
    background-color: var(--bkgColor);
    border-radius: 5px;
  }
`;

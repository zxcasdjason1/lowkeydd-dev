import { useEffect } from "react";
import { useSelector, useDispatch } from "../../../app/hooks";
import Channel from "../../../components/Channel";
import { ChannelProps } from "../../../types";
import styled from "styled-components";
import { getFavoredChannels } from "../api";

export function FavoredChannels() {
  const channelGroups = useSelector((state) => state.channelgroups);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // 透過當前路徑去解析，取得要獲取的資源標籤
    dispatch(getFavoredChannels(user.username, user.ssid));
    return () => {
      // componentWillUnmount
    };
  }, [dispatch]);

  return (
    <>
    {
      Object.keys(channelGroups).map((keyName, i)=>
        <GroupChannels key={keyName+"_"+i} channels = {channelGroups[keyName]}/>
      )
    }
    </>
  );
}

function GroupChannels(props: { channels: ChannelProps[] }) {
  const { channels } = props;
  return (
    <ChannelGridCantainer>
      {channels.map((ch: ChannelProps) => 
        <Channel key={ch.cid} {...ch} />
      )}
    </ChannelGridCantainer>
  );
}

const ChannelGridCantainer = styled.div`
  display: grid;
  grid-gap: 6px;
  grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
  align-items: center;
`;

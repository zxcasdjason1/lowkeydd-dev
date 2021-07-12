import styled from "styled-components";
import { ChannelsSearch } from "../../features/channelStore/ChannelsSearch";
import { FavoredChannels } from "../../features/channelStore";
import { useSelector, useDispatch } from "../../app/hooks";
import { useEffect } from "react";
import { fetchChannels } from "../../features/channelStore/api";
import { selectUser } from "../../features/user/slice";
import { selectChannelTags } from "../../features/channelStore/slice";

export default function ChannelsStage() {

  const { username, ssid } = useSelector(selectUser);
  const tags = useSelector(selectChannelTags);
  const dispatch = useDispatch()

  useEffect(() => {
    // 透過當前路徑去解析，取得要獲取的資源標籤
    dispatch(fetchChannels(username, ssid, tags));
    return () => {
      // componentWillUnmount
    };
  }, [dispatch]);

  return (
    <Container>
      <ChannelsSearch />
      <FavoredChannels />
    </Container>
  );
}

const Container = styled.div`

  position: absolute;
  top: 65px;
  left: 0;

  width: 100%;
  height: calc( 100vh - 65px);

  display: flex;
  flex-direction: column;
`;

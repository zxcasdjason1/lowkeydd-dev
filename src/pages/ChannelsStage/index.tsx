import styled from "styled-components";
import { ChannelsSearch } from "../../features/channelGroups/ChannelsSearch";
import { ResidentChannels, FavoredChannels } from "../../features/channelGroups";
import { useSelector } from "../../app/hooks";

export default function ChannelsStage() {
  const user = useSelector((state) => state.user);

  return (
    <Container>
      <ChannelsSearch />
      {user.ssid !== "" ? <FavoredChannels/> : <ResidentChannels/>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

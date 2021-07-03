import styled from "styled-components";
import { ChannelsSearch } from "../../features/groupedChannels/ChannelsSearch";
import { FavoredChannels } from "../../features/groupedChannels";
import { useSelector } from "../../app/hooks";

export default function ChannelsStage() {
  const user = useSelector((state) => state.user);

  return (
    <Container>
      <ChannelsSearch />
      <FavoredChannels/> 
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

import styled from "styled-components";
import { ChannelsSearch } from "../../features/channelStore/ChannelsSearch";
import { FavoredChannels } from "../../features/channelStore";
import { useSelector, useDispatch } from "../../app/hooks";
import { useEffect } from "react";
import { fetchChannels } from "../../features/channelStore/api";
import { selectUser } from "../../features/user/slice";
import { selectChannelTags } from "../../features/channelStore/slice";
import { ChannelsCollector } from "../../features/channelStore/ChannelsCollector";
import { SearchSwitchers } from "../../features/channelStore/SearchSwitchers";
import { Fragment } from "react";
import { RouteComponentProps } from "react-router-dom";

interface MatchParams {
  form: string;
}

interface ChannelsStageProps extends RouteComponentProps<MatchParams> {}

export default function ChannelsStage(props: ChannelsStageProps) {
  const isEnabled = props.match.params.form === "visit";
  const user = useSelector(selectUser);
  const tags = useSelector(selectChannelTags);
  const dispatch = useDispatch();

  useEffect(() => {
    const { username, ssid } = user;
    // 透過當前路徑去解析，取得要獲取的資源標籤
    dispatch(fetchChannels(username, ssid, tags));
    return () => {
      // componentWillUnmount
    };
  }, [dispatch, user, tags]);

  return (
    <Container>
      <ControlPanel>
        <ChannelsSearch />
        <SearchSwitchers />
      </ControlPanel>
      <FavoredChannels />
      {isEnabled ? <ChannelsCollector /> : <Fragment />}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 65px;
  left: 0;

  width: 100%;
  height: calc(100vh - 65px);

  display: flex;
  flex-direction: column;
`;

const ControlPanel = styled.div`
  position: relative;
  background-color: #666;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-content: center;
  align-items: center;
`;

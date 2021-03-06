import styled from "styled-components";
import { useSelector, useDispatch } from "../../app/hooks";
import { selectUser } from "../../features/user/slice";
import { Fragment, useLayoutEffect } from "react";
import {
  selectChannelsInGroup,
  selectCurrent,
  selectTags,
  setSearchResult,
  setStore,
} from "../../features/channelCardStore/slice";
import {
  ChannelCardsGroup,
  ChannelSearch,
  ChannelTagsSwitchers,
  ChannelCardsBrowser,
} from "../../features/channelCardStore";
import { reqFetchChannels } from "../../features/channelCardStore";
import RocketLoading from "../../components/RocketLoading";

export default function ChannelsStage() {
  const channels = useSelector(selectChannelsInGroup);
  const user = useSelector(selectUser);
  const tags = useSelector(selectTags);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const { username, ssid } = user;
    dispatch(setSearchResult({ current: null })); //清空當前搜尋紀錄
    dispatch(setStore({ channels: [], group: [], tags })); //清空當前頻道
    dispatch(reqFetchChannels(username, ssid, tags)); //請求Channels
    return () => {};
  }, [dispatch, user, tags]);

  return (
    <Container>
      {channels.length > 0 ? (
        <>
          <ControlPanel>
            <ChannelSearch />
            <ChannelTagsSwitchers />
          </ControlPanel>
          <ChannelSearchCard />
          <ChannelCardsBrowser />
        </>
      ) : (
        <Wrap>
          <RocketLoading />
        </Wrap>
      )}
    </Container>
  );
}

function ChannelSearchCard() {
  const current = useSelector(selectCurrent);

  return (
    <>
      {current !== null ? (
        current.status === "failure" ? (
          <ChannelCardsGroup
            key={"ChannelCardsGroup_" + current.group}
            cards={[current]}
            groupName={current.group}
          />
        ) : (
          <ChannelCardsGroup
            key={"ChannelCardsGroup_" + current.group}
            cards={[current]}
            groupName={current.group}
          />
        )
      ) : (
        <Fragment />
      )}
    </>
  );
}

const Wrap = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh - 65px);
  background: none;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  position: absolute;
  top: 65px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  height: calc(100vh - 65px);
  background: #4c5c68;
  overflow-y: auto;

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

import styled from "styled-components";
import { useSelector, useDispatch } from "../../app/hooks";
import { selectUser } from "../../features/user/slice";
import { Fragment, useLayoutEffect } from "react";
import {
  selectCurrent,
  selectFavoredList,
  selectIsFavoredCardsListChanged,
  selectIsFavoredCardsViewerEnable,
  selectTags,
} from "../../features/channelCardStore/slice";
import {
  reqFetchChannels,
  reqEditVisit,
} from "../../features/channelCardStore";
import {
  ChannelCardsGroup,
  ChannelSearch,
  ChannelTagsSwitchers,
  ChannelCardsBrowser,
} from "../../features/channelCardStore";

export default function ChannelsStage() {
  const isEnable = useSelector(selectIsFavoredCardsViewerEnable);
  const user = useSelector(selectUser);
  const tags = useSelector(selectTags);
  const isListChanged = useSelector(selectIsFavoredCardsListChanged);
  const favoredList = useSelector(selectFavoredList);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (isListChanged) {
      const { username, ssid } = user;
      // 透過當前路徑去解析，取得要獲取的資源標籤
      dispatch(reqEditVisit(username, ssid, favoredList, tags));
    } else {
      const { username, ssid } = user;
      // 透過當前路徑去解析，取得要獲取的資源標籤
      dispatch(reqFetchChannels(username, ssid, tags));
    }
    return () => {};
  }, [dispatch, user, tags]);

  return (
    <Container isStopScroll={isEnable}>
      <ControlPanel>
        <ChannelSearch />
        <ChannelTagsSwitchers />
      </ControlPanel>
      <ChannelSearchCard />
      <ChannelCardsBrowser />
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

const Container = styled.div<{ isStopScroll: boolean }>`
  position: absolute;
  top: 65px;
  left: 0;

  width: 100%;
  height: calc(100vh - 65px);

  display: flex;
  flex-direction: column;
  overflow: ${(p) => (p.isStopScroll ? `hidden` : `auto`)};
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

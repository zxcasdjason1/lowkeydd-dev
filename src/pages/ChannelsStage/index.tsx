import styled from "styled-components";
import { useSelector, useDispatch } from "../../app/hooks";
import { selectUser } from "../../features/user/slice";
import { Fragment, useLayoutEffect } from "react";
import {
  selectCurrent,
  selectFavoredList,
  selectIsFavoredCardsListChanged,
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

  const user = useSelector(selectUser);
  const tags = useSelector(selectTags);
  const isListChanged = useSelector(selectIsFavoredCardsListChanged);
  const favoredList = useSelector(selectFavoredList);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (isListChanged) {
      // 檢查收藏表單是否已經被改變，如果已有異動，先發送請求獲取新的收藏表單。
      const { username, ssid } = user;
      dispatch(reqEditVisit(username, ssid, favoredList, tags));
    } else {
      // 獲取當前資料庫中的頻道資訊。
      const { username, ssid } = user;
      dispatch(reqFetchChannels(username, ssid, tags));
    }
    return () => {};
  }, [dispatch, user, tags]);

  return (
    <Container>
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

const Container = styled.div`
  position: absolute;
  top: 65px;
  left: 0;

  width: 100%;
  height: calc(100vh - 65px);

  display: flex;
  flex-direction: column;
  overflow: "auto";
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

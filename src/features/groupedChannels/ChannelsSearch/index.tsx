import styled from "styled-components";
import SearchBox from "../../../components/SearchBox";

import { useDispatch, useSelector } from "../../../app/hooks";
import { getLetsddV2Channels } from "../api";
import SearchSwitchers from "../SearchSwitchers";

export function ChannelsSearch() {
  const { username, ssid } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSubmit = (keyword: string) => {
    dispatch(getLetsddV2Channels(username, ssid, [keyword]));
  };

  return (
    <SearchContainer>
      <SearchBox
        onSubmit={onSubmit}
        theme={{ focusColor: "#1985a1", iconColor: "#c5c3c6" }}
      />
      <SearchSwitchers />
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  background-color: #666;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-content: center;
  align-items: center;
`;

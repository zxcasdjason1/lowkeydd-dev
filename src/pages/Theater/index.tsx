import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "../../app/hooks";
import { TheaterSlider, TheaterIframes } from "../../features/theater";
import { reqTheaterChannels } from "../../features/theater/api";
import { selectPlaylistMap } from "../../features/theater/slice";

export default function Theater() {
  const playlistMap = useSelector(selectPlaylistMap);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reqTheaterChannels("live", playlistMap));
    return () => {};
  }, []);

  return (
    <Wrap>
      <TheaterSlider />
      <TheaterIframes />
    </Wrap>
  );
}

const Wrap = styled.div`
  position: absolute;
  left: 0;
  top: 65px;
  width: 100%;
  height: calc(100vh - 65px);
  background-color: greenyellow;
`;

import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "../../app/hooks";
import { TheaterSlider, TheaterIframes } from "../../features/theater";
import { reqTheaterChannels } from "../../features/theater/api";
import {
  selectPlaylist,
  selectPlaylistMap,
  selectSlider,
  setSliderFolded,
} from "../../features/theater/slice";
import * as ai from "react-icons/ai";
export default function Theater() {
  const playlistMap = useSelector(selectPlaylistMap);
  const playlist = useSelector(selectPlaylist);
  const dispatch = useDispatch();
  const { isFolded } = useSelector(selectSlider);

  const sliderFold = () => {
    dispatch(setSliderFolded(!isFolded));

    // 主動觸發一次resize
    if (playlist.length >  0 ){
      console.log("resize on after sliderFold")
      window.dispatchEvent(new Event("resize"));
    }
  };

  useEffect(() => {
    dispatch(reqTheaterChannels("live", playlistMap));
    return () => {};
  }, []);

  return (
    <>
      <Control onClick={sliderFold}>
        {isFolded ? (
          <ai.AiOutlineVerticalAlignBottom />
        ) : (
          <ai.AiOutlineVerticalAlignTop />
        )}
      </Control>
      <Wrap isFolded={isFolded}>
        <TheaterSlider />
        <TheaterIframes />
      </Wrap>
    </>
  );
}

const Wrap = styled.div<{ isFolded: boolean }>`
  --topOffset: ${(props) => (props.isFolded ? `-35` : `65`)}px;

  position: absolute;
  left: 0;
  top: var(--topOffset);

  width: 100%;
  height: calc(100vh - var(--topOffset));
  background-color: greenyellow;
`;

const Control = styled.span`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 115px;
  left: calc(100% - 35px);
  text-align: right;

  font-size: 45px;
  background-color: #eee;
  color: hotpink;
  opacity: 0.7;

  cursor: pointer;
  z-index: 2;
  border-radius: 50%;

  :hover {
    background-color: hotpink;
    color: gray;
    transition: 0.3s;
  }
`;

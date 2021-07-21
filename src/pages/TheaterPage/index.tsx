import { useLayoutEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "../../app/hooks";
import { TheaterSlider, TheaterIframesViewer } from "../../features/theater";
import { reqTheaterChannels } from "../../features/theater";
import {
  selectPlaylist,
  selectSlider,
  setSliderFolded,
} from "../../features/theater/slice";
import * as ai from "react-icons/ai";
import { selectHasFetchChannels } from "../../features/channelCardStore/slice";
import { history } from "../..";

type Props = {
  setNavbarFolded:(isFolded:boolean)=>void
}

export default function TheaterPage(props:Props) {
  const hasfetchChannels = useSelector(selectHasFetchChannels);
  const playlist = useSelector(selectPlaylist);
  const { isFolded } = useSelector(selectSlider);
  const dispatch = useDispatch();

  const sliderFold = () => {
    dispatch(setSliderFolded(!isFolded));

    // 主動觸發一次resize
    if (playlist.length > 0) {
      console.log("resize on after sliderFold");
      window.dispatchEvent(new Event("resize"));
    }
  };
  
  useLayoutEffect(() => {
    if (!hasfetchChannels){
      history.push({pathname:"/channels"})
      return;
    }
    dispatch(reqTheaterChannels("live", playlist));
    return () => {};
  }, [dispatch, playlist, hasfetchChannels]);

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
        <TheaterIframesViewer />
      </Wrap>
    </>
  );
}

const Wrap = styled.div<{ isFolded: boolean }>`
  --topOffset: ${(props) => (props.isFolded ? `-100` : `65`)}px;

  position: absolute;
  left: 0;
  top: var(--topOffset);

  width: 100%;
  height: calc(100vh - var(--topOffset));
  z-index: 5;
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
  z-index: 6;
  border-radius: 50%;

  :hover {
    background-color: hotpink;
    color: gray;
    transition: 0.3s;
  }
`;

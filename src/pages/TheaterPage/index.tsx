import { useLayoutEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "../../app/hooks";
import { TheaterSlider, TheaterIframesViewer, reqTheaterChannels } from "../../features/theater";

import {
  selectSlider,
  setFullScreen,
  setSliderFolded,
} from "../../features/theater/slice";
import * as ai from "react-icons/ai";
import { selectHasFetchChannels } from "../../features/channelCardStore/slice";
import { history } from "../..";

type Props = {
  setNavbarFolded: (isFolded: boolean) => void;
};

export default function TheaterPage(props: Props) {
  const hasfetchChannels = useSelector(selectHasFetchChannels);
  const { isFolded,isFullScreen } = useSelector(selectSlider);
  const dispatch = useDispatch();

  const sliderFold = () => {
    dispatch(setSliderFolded(!isFolded));
  };

  const fullScreen = ()=>{
    dispatch(setFullScreen(!isFullScreen));
  }

  useLayoutEffect(() => {
    // 進入Theater前，必須先至少取得一次完整的頻道資訊避免異常。
    if (!hasfetchChannels) {
      history.push({ pathname: "/channels" });
      return;
    }
    // 進入頁面時，先獲取Theater清單(目前為取出所有live頻道)
    dispatch(reqTheaterChannels("live"));
    return () => {};
  }, [hasfetchChannels, dispatch]);

  return (
    <>
      <HideNavBarBtn onClick={sliderFold} isFolded={isFolded}>
        {isFolded ? (
          <ai.AiOutlineVerticalAlignBottom />
        ) : (
          <ai.AiOutlineVerticalAlignTop />
        )}
      </HideNavBarBtn>
      <FullScreenBtn onClick={fullScreen} isFolded={isFolded}>
        {isFullScreen ? (
          <ai.AiOutlineFullscreenExit />
          ) : (
          <ai.AiOutlineFullscreen />
        )}
      </FullScreenBtn>
      <Wrap isFolded={isFolded}>
        <TheaterSlider />
        <TheaterIframesViewer />
      </Wrap>
    </>
  );
}

const Wrap = styled.div<{ isFolded: boolean }>`
  --topOffset: ${(props) => (props.isFolded ? `-100px` : `65px`)};

  position: absolute;
  left: 0;
  top: var(--topOffset);

  width: 100%;
  height: calc(100vh - var(--topOffset));
  z-index: 5;
`;

const HideNavBarBtn = styled.span<{ isFolded: boolean }>`
  position: absolute;
  transform: translate(-50%, -50%);
  top: ${(p) => (p.isFolded ? `85px` : `135px`)};
  left: calc(100% - 35px);
  text-align: right;

  font-size: 35px;
  background-color: #eee;
  color: hotpink;
  opacity: 0.7;

  cursor: pointer;
  z-index: 10;
  border-radius: 50%;

  transition: 0.3s;

  :hover {
    background-color: hotpink;
    color: gray;
  }
`;

const FullScreenBtn = styled.span<{ isFolded: boolean }>`
  position: absolute;
  transform: translate(-50%, -50%);
  top: ${(p) => (p.isFolded ? `35px` : `85px`)};
  left: calc(100% - 35px);
  text-align: right;

  font-size: 35px;
  background-color: #eee;
  color: hotpink;
  opacity: 0.7;

  cursor: pointer;
  z-index: 10;
  border-radius: 50%;

  transition: 0.3s;

  :hover {
    background-color: hotpink;
    color: gray;
  }
`;

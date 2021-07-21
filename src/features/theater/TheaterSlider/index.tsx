import styled from "styled-components";
import { useDispatch, useSelector } from "../../../app/hooks";
import { IframeProps } from "../../../app/types";
import {
  setSlider,
  selectNumOfElements,
  selectSliderElements,
  selectSlider,
} from "../slice";
import * as ai from "react-icons/ai";
import { TheaterSliderItem } from "../TheaterSliderItem";

export function TheaterSlider() {
  const { sliderIndex, isTakenOverAnim } = useSelector(selectSlider);
  const numOfElements = useSelector(selectNumOfElements);
  const sliderElements = useSelector(selectSliderElements);
  const dispatch = useDispatch();

  const sliderLeft = () => {
    let next = sliderIndex - 1;
    if (next === 0) {
      dispatch(setSlider({ next: numOfElements + 1, isTakenOverAnim: true }));
      setTimeout(() => {
        dispatch(setSlider({ next: numOfElements, isTakenOverAnim: false }));
      });
    } else {
      dispatch(setSlider({ next, isTakenOverAnim: false }));
    }
  };

  const sliderRight = () => {
    let next = sliderIndex + 1;
    if (next === numOfElements + 1) {
      dispatch(setSlider({ next: 0, isTakenOverAnim: true }));
      setTimeout(() => {
        dispatch(setSlider({ next: 1, isTakenOverAnim: false }));
      });
    } else {
      dispatch(setSlider({ next, isTakenOverAnim: false }));
    }
  };

  console.log(
    `[TheaterSlider] render, numOfElements: ${numOfElements}, sliderIndex: ${sliderIndex}`
  );
  return (
    <SliderWrap>
      <SliderContainer>
        <Control onClick={sliderLeft}>
          <ai.AiOutlineLeftCircle />
        </Control>
        <Control onClick={sliderRight}>
          <ai.AiOutlineRightCircle />
        </Control>
        <Content>
          {sliderElements.map((e: IframeProps, i: number) => (
            <TheaterSliderItem
              key={`slider_${i}_cid_${e.cid}_content`}
              item={e}
              index={sliderIndex}
              isStopTrans={isTakenOverAnim}
            />
          ))}
        </Content>
      </SliderContainer>
    </SliderWrap>
  );
}

const SliderWrap = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  z-index: 1;
`;

const SliderContainer = styled.div`
  --navColor: #4c4a46;
  --toogleColor: #1985a1;

  position: relative;
  width: 100%;

  margin: 0 auto;
  overflow: hidden;
  background-color: var(--navColor);
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
`;

const Content = styled.div`
  width: 100%;

  background-color: gray;
  margin: 0 auto;
  display: flex;
  justify-content: left;
  overflow: hidden;

  align-items: center;
`;

const Control = styled.span`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;

  font-size: 50px;
  background-color: none;
  color: hotpink;
  opacity: 0.7;

  cursor: pointer;
  z-index: 1;
  border-radius: 50%;
  :nth-of-type(1) {
    left: 30px;
    text-align: right;
  }
  :nth-of-type(2) {
    left: calc(100% - 100px);
    text-align: right;
  }
  :hover {
    background-color: hotpink;
    color: gray;
    transition: 0.3s;
  }
`;

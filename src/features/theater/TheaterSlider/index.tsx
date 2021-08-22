import styled from "styled-components";
import { useDispatch, useSelector } from "../../../app/hooks";
import { TheaterElement } from "../../../app/types";
import {
  selectNumOfElements,
  selectSliderElements,
  selectSlider,
} from "../slice";
import * as ai from "react-icons/ai";
import { TheaterSliderItem } from "../TheaterSliderItem";
import { playSliderLeft, playSliderRight } from "../api";


export function TheaterSlider() {
  const { sliderIndex, isTakenOverAnim } = useSelector(selectSlider);
  const numOfElements = useSelector(selectNumOfElements);
  const sliderElements = useSelector(selectSliderElements);
  const dispatch = useDispatch();

  const sliderLeft = () => {
    dispatch(playSliderLeft(sliderIndex, numOfElements));
  };

  const sliderRight = () => {
    dispatch(playSliderRight(sliderIndex, numOfElements));
  };

  // console.log(
  //   `[TheaterSlider] render, numOfElements: ${numOfElements}, sliderIndex: ${sliderIndex}`
  // );
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
          {sliderElements.map((e: TheaterElement, i: number) => (
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
  height: 100vh;
  background-color:#4c4a46;
  z-index: 1;
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  background: none;
`;

const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: left;
  overflow: hidden;
  align-items: center;
  background: none;
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

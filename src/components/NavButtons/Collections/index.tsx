import styled from "styled-components";
import { useSelector } from "../../../app/hooks";
import { NavButtonProps } from "../../../app/types";
import { selectNumOfNewAdded } from "../../../features/favored/slice";

import NavButton from "../NavButton";

export function NavCollections(props: NavButtonProps) {
  const numOfAddedFavored = useSelector(selectNumOfNewAdded);

  return (
    <NavButton {...props}>
      <Counter visible={numOfAddedFavored > 0}>
        <span>{numOfAddedFavored}</span>
      </Counter>
    </NavButton>
  );
}

const Counter = styled.div<{ visible: boolean }>`
  --display: ${(props) => [props.visible ? `block` : `none`]};
  display: var(--display);
  text-align: center;
  line-height: 18px;
  position: absolute;
  color: #fff;
  top: 22px;
  right: 95px;
  font-size: 12px;
  pointer-events: none;

  span {
    display: var(--display);
    content: "";
    transform: translate(-50%, -50%);
    position: absolute;
    top: 0px;
    left: 0px;
    width: 18px;
    height: 18px;
    color: white;
    background-color: red;
    border-radius: 50%;
  }
  @media screen and (max-width: 768px) and (min-width: 480px) {
    line-height: 18px;
    top: 19px;
    right: 24px;
    font-size: 14px;
  }
  @media screen and (max-width: 480px) {
    line-height: 16px;
    font-size: 12px;
    top: 327px;
    left: 102px;
  }
`;

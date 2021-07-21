import styled from "styled-components";
import * as ai from "react-icons/ai";
import { IframeProps } from "../../../app/types";
import { removeIframeFromPlaylist } from "../slice";
import { useDispatch } from "../../../app/hooks";
import { useState } from "react";

export function TheaterIframeItem(props: IframeProps) {
  const { cid, src, cname } = props;
  const [isEnable, setIsEnable] = useState(false);
  const item = props;

  const dispatch = useDispatch();
  const showMenu = () => {
    setIsEnable(!isEnable);
  };
  const onLeaveMenu = () => {
    setIsEnable(false);
  };
  const onEnterMenu = () => {
    setIsEnable(true);
  };
  const removeIframe = () => {
    dispatch(removeIframeFromPlaylist({ item }));
  };

  return (
    <IframeGridLocator>
      <IframeContainer>
        <Menu
          onClick={showMenu}
          onMouseEnter={onEnterMenu}
          onMouseLeave={onLeaveMenu}
          isEnable={isEnable}
        >
          <div onClick={removeIframe}>
            <ai.AiOutlineCloseCircle />
          </div>
        </Menu>
        <iframe
          key={"iframes_" + cid}
          src={src}
          title={`${cname}'s channel`}
        ></iframe>
      </IframeContainer>
    </IframeGridLocator>
  );
}

const IframeGridLocator = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IframeContainer = styled.div`
  width: var(--iframeWidth);
  height: var(--iframeHeight);
  position: absolute;
  iframe {
    z-index: 1;
    width: var(--iframeWidth);
    height: var(--iframeHeight);
  }
`;

const Menu = styled.h1<{ isEnable: boolean }>`
  top: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: ${(p) => (p.isEnable ? `200px` : `50px`)};
  background-color: black;
  opacity: ${(p) => (p.isEnable ? `0.8` : `0.02`)};
  transition: 0.6s;

  display: flex;
  align-items: center;
  justify-content: center;
  div {
    font-size: ${(p) => (p.isEnable ? `100px` : `0px`)};
    svg {
      position: relative;
      top: ${(p) => (p.isEnable ? `0%` : `30%`)};
      color: hotpink;
      cursor: pointer;
      border-radius: 50%;
      opacity: ${(p) => (p.isEnable ? `.8` : `0`)};
      transform: ${(p) => (p.isEnable ? `rotate(360deg)` : `none`)};
      transition: 0.4s;
      :hover {
        color: gray;
        background-color: hotpink;
      }
    }
  }
`;

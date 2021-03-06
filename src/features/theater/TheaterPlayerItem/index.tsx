import styled from "styled-components";
import * as ai from "react-icons/ai";
import { useState } from "react";
import { ChatboxIframe, PlayerIframe } from "../../../app/types";
import { removeIframeByCid, switchChatBoxByCid } from "../slice";
import { useDispatch } from "../../../app/hooks";
import { TheaterChatbox } from "../TheaterChatbox";

type Props = {
  flexType: string;
  player: PlayerIframe;
  chatbox: ChatboxIframe;
};

export function TheaterPlayerItem(props: Props) {
  const { flexType, player, chatbox } = props;
  const { cid, w: pw, h: ph } = player;
  const { w: cw, h: ch } = chatbox;
  const [isEnable, setIsEnable] = useState(false);

  const dispatch = useDispatch();
  const showMenu = () => {
    console.log("showMenu");
    setIsEnable(!isEnable);
  };
  const onLeaveMenu = () => {
    setIsEnable(false);
  };
  const onEnterMenu = () => {
    setIsEnable(true);
  };
  const removeIframe = () => {
    dispatch(removeIframeByCid({ cid }));
  };
  const switchChatBox = () => {
    dispatch(switchChatBoxByCid({ cid }));
  };

  return (
    <IframeGridLocator
      flexType={flexType}
      playerWidth={pw}
      playerHeight={ph}
      chatboxWidth={cw}
      chatboxHeight={ch}
    >
      <IframeContainer>
        {getPlayerIframe(player)}
        <Menu
          onClick={showMenu}
          onMouseEnter={onEnterMenu}
          onMouseLeave={onLeaveMenu}
          isEnable={isEnable}
        >
          <div onClick={removeIframe}>
            <ai.AiOutlineCloseCircle />
          </div>
          &nbsp;
          <div onClick={switchChatBox}>
            <ai.AiOutlineMessage />
          </div>
        </Menu>
      </IframeContainer>
      <TheaterChatbox {...chatbox} />
    </IframeGridLocator>
  );
}

const getPlayerIframe = (player: PlayerIframe): any => {
  const { method, cid, src, cname } = player;
  switch (method) {
    case "youtube":
      return (
        <iframe
          key={`Youtube_PlayerIframe_${cid}`}
          src={src}
          title={`${cname}'s channel`}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={false}
          sandbox="allow-modals allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation"
        ></iframe>
      );
    case "twitch":
      return (
        <iframe
          key={`Twitch_PlayerIframe_${cid}`}
          src={src}
          title={`${cname}'s channel`}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={false}
          sandbox="allow-modals allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation"
        ></iframe>
      );
    default:
      console.error("???????????????????????????: ", method);
      break;
  }
};

const IframeGridLocator = styled.div<{
  flexType: string;
  playerWidth: number;
  playerHeight: number;
  chatboxWidth: number;
  chatboxHeight: number;
}>`
  --playerWidth: ${(p) => p.playerWidth}px;
  --playerHeight: ${(p) => p.playerHeight}px;
  --chatboxWidth: ${(p) => p.chatboxWidth}px;
  --chatboxHeight: ${(p) => p.chatboxHeight}px;
  position: relative;
  display: flex;
  flex-direction: ${(p) => p.flexType};
  align-items: center;
  justify-content: center;
  background-color: #000;
`;

const IframeContainer = styled.div`
  width: var(--playerWidth);
  height: var(--playerHeight);
  position: relative;
  iframe {
    width: var(--playerWidth);
    height: var(--playerHeight);
  }
`;

const Menu = styled.h1<{ isEnable: boolean }>`
  top: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: ${(p) => (p.isEnable ? `80px` : `50px`)};
  max-height: 100vh;
  background-color: #000;
  opacity: ${(p) => (p.isEnable ? `0.8` : `0.02`)};
  transition: 0.6s;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  // MenuButton
  div {
    font-size: ${(p) => (p.isEnable ? `50px` : `0px`)};
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

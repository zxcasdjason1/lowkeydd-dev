import { Fragment } from "react";
import styled from "styled-components";
import { ChatboxIframe } from "../../../app/types";

export function TheaterChatbox(props: ChatboxIframe) {
  const chatbox = props;
  const { w, h } = props;
  return (
    <>
      {chatbox.isEnable ? (
        <ChatboxContainer width={w} height={h}>{getChatboxIframe(chatbox)}</ChatboxContainer>
      ) : (
        <Fragment/>
      )}
    </>
  );
}

const getChatboxIframe = (chatbox: ChatboxIframe): any => {
  const { method, cid, src, cname } = chatbox;
  switch (method) {
    case "youtube":
      return (
        <iframe
          key={`Youtube_ChatboxIframe_${cid}`}
          src={src}
          title={`${cname}'s channel`}
          scrolling="no"
          allowFullScreen={false}
          allowTransparency={true}
          seamless={false}
        ></iframe>
      );
    case "twitch":
      return (
        <iframe
          key={`Twitch_ChatboxIframe_${cid}`}
          src={src}
          title={`${cname}'s channel`}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={false}
          allowTransparency={true}
          seamless={false}
        ></iframe>
      );
    default:
      console.error("缺少對應的處理方式: ", method);
      break;
  }
};

const ChatboxContainer = styled.div<{ width: number; height: number }>`
  background-color: #000;
  width: ${(p) => p.width};
  height: ${(p) => p.height};
  iframe {
    width: ${(p) => p.width};
    height: ${(p) => p.height};
  }
`;

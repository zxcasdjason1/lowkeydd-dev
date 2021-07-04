import { useState } from "react";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { ChannelProps } from "../../types";
import "./index.css";

interface ChannelItemPorps extends ChannelProps {
  // 配合lazyload；初始預設都為不可視
}

export function ChannelItem(props: ChannelItemPorps) {
  const {
    avatar,
    cid,
    owner,
    status,
    streamurl,
    thumbnail,
    title,
    viewcount,
    starttime,
    method,
    updatetime,
  } = props;

  const channelItem_Ref = useRef<HTMLDivElement>(null);
  // const statusImg_Ref = useRef<HTMLImageElement>(null);
  // const previewImg_Ref = useRef<HTMLImageElement>(null);

  // lazyloading
  // 1) 影藏整個區塊
  // 2) 讓img src 不獲取圖片
  const [isVisible, setIsVisible] = useState(false);

  const handleObserve = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserve);
    if (channelItem_Ref.current) {
      observer.observe(channelItem_Ref.current);
    }
    return () => {
      if (channelItem_Ref.current) {
        observer.unobserve(channelItem_Ref.current);
      }
    };
  }, [channelItem_Ref]);

  return (
    <Visible visible={true} ref={channelItem_Ref}>
      <Container {...getChannelTheme(status)}>
        <ChannelStatus className="avatarbox">
          <img
            src={isVisible ? avatar : undefined}
            alt={"avatar_" + cid}
            // ref={statusImg_Ref}
          />
          <p>{status}</p>
        </ChannelStatus>
        <PreviewLink href={isVisible ? streamurl : undefined}>
          <img
            src={isVisible ? thumbnail : undefined}
            alt={"thumbnail_" + cid}
            // ref={previewImg_Ref}
          />
        </PreviewLink>
        <div className="channel_Description">
          <div className="channel_Title">
            <p>{title}</p>
          </div>
          <div className="channel_Owner">{owner}</div>
          <div className="channel_Views">{viewcount}</div>
          <div className="channel_Time">{starttime}</div>
        </div>
      </Container>
    </Visible>
  );
}
const Visible = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? "block" : "none")};
`;

type ChannelThemeProps = {
  fontcolor: string;
  fontbgcolor: string;
  bordercolor: string;
};

const Container = styled.div<ChannelThemeProps>`
  --fontcolor: ${(props) => props.fontcolor};
  --fontbgcolor: ${(props) => props.fontbgcolor};
  --bordercolor: ${(props) => props.bordercolor};
  margin: 0px 10px 20px 10px;
  padding: 10px;
  border: solid 2px var(--bordercolor);
  border-radius: 5px;
`;

const getChannelTheme = (channelstatus: string): ChannelThemeProps => {
  switch (channelstatus) {
    case "live":
      return {
        fontcolor: "#fff",
        fontbgcolor: "#f00",
        bordercolor: "#f00",
      };
    case "wait":
      return {
        fontcolor: "#fff",
        fontbgcolor: "#34afeb",
        bordercolor: "#6a97ad",
      };
    case "off":
      return {
        fontcolor: "#f9fae6",
        fontbgcolor: "#616161",
        bordercolor: "#616161",
      };
    default:
      return {
        fontcolor: "#f0d8e2",
        fontbgcolor: "#cb4ede",
        bordercolor: "#6c3075",
      };
  }
};

const ChannelStatus = styled.div`
  position: absolute;

  img {
    position: relative;
    top: -1.1rem;
    left: -1.2rem;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    border: 3px solid var(--bordercolor);
    background: var(--fontcolor);
  }

  p {
    position: relative;
    top: -1.8rem;
    left: 0rem;
    width: 46px;
    height: 20px;
    text-align: center;
    font-size: 18px;
    text-transform: uppercase;
    color: var(--fontcolor);
    background: var(--fontbgcolor);
    border-radius: 10%;
  }
`;

const PreviewLink = styled.a`
  display: block;
  height: 8rem;
  background-color: #000;
  display: flex;
  align-items: center;

  img {
    width: 100%;
    vertical-align: middle;
  }
`;

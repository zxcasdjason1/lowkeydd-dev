import { useState } from "react";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { ChannelProps } from "../../types";
import * as ai from "react-icons/ai";

interface SympleChannelCardPorps extends ChannelProps {}

export default function SympleChannelCard(props: SympleChannelCardPorps) {
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

  const [isVisible, setIsVisible] = useState(false);
  const channelItem_Ref = useRef<HTMLDivElement>(null);
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
    <Container ref={channelItem_Ref}>
      <AvatarBox>
        <img
          src={isVisible ? avatar : undefined}
          alt={"avatar_" + cid}
          // ref={statusImg_Ref}
        />
        <p>{status}</p>
      </AvatarBox>
      <PreviewBox href={isVisible ? streamurl : undefined}>
        <img
          src={isVisible ? thumbnail : undefined}
          alt={"thumbnail_" + cid}
          // ref={previewImg_Ref}
        />
      </PreviewBox>
      <p>{title}</p>
      <p>{owner}</p>
      <div>
        <ai.AiOutlineEye />
      </div>
      <p>{viewcount}</p>
      <div>
        <ai.AiOutlineCalendar />
      </div>
      <p>{starttime}</p>
    </Container>
  );
}

const Container = styled.div`
  background-color: aqua;
  position: relative;
  margin: 20px auto;
`;

const AvatarBox = styled.div`
  position: relative;
  left: 0;
  top: 0;
  background-color: #333;

  img {
    width: 20%;
    position: relative;
    left: 0;
    top: 0;
  }
`;

const PreviewBox = styled.a`
  position: relative;
  left: 0;
  top: 0;
  background-color: #93af16;
  width: 100%;

  img {
    width: 100%;
    position: relative;
    left: 0;
    top: 0;
  }
`;

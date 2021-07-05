import { useState } from "react";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { ChannelProps } from "../../types";

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
    <div ref={channelItem_Ref}>
      <Container>
        <div className="avatarbox">
          <img
            src={isVisible ? avatar : undefined}
            alt={"avatar_" + cid}
            // ref={statusImg_Ref}
          />
          <p>{status}</p>
        </div>
        <a href={isVisible ? streamurl : undefined}>
          <img
            src={isVisible ? thumbnail : undefined}
            alt={"thumbnail_" + cid}
            // ref={previewImg_Ref}
          />
        </a>
        <div className="channel_Description">
          <div className="channel_Title">
            <p>{title}</p>
          </div>
          <div className="channel_Owner">{owner}</div>
          <div className="channel_Views">{viewcount}</div>
          <div className="channel_Time">{starttime}</div>
        </div>
      </Container>
    </div>
  );
}

const Container = styled.div`

`;
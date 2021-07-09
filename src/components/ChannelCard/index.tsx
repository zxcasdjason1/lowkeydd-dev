import { useState } from "react";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { ChannelProps } from "../../types";
import * as ai from "react-icons/ai";

interface ChannelCardPorps extends ChannelProps {}

export default function ChannelCard(props: ChannelCardPorps) {
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
        />
        <div>
          <p>{status}</p>
        </div>
      </AvatarBox>
      <CardBody>
        <PreviewBox href={isVisible ? streamurl : undefined}>
          <div>
            <img
              src={isVisible ? thumbnail : undefined}
              alt={"thumbnail_" + cid}
            />
          </div>
        </PreviewBox>
        <Description>
          <Owner>
            <h1>
              {owner}
            </h1>
          </Owner>
          <ChTitle>
            <p>{title}</p>
          </ChTitle>
          <Detail>
            <Left>
              <ai.AiOutlineEye />
              <p>{viewcount}</p>
            </Left>
            <Right>
              <ai.AiOutlineCalendar />
              <p>{starttime}</p>
            </Right>
          </Detail>
        </Description>
      </CardBody>
    </Container>
  );
}

const Container = styled.div`
  --navColor: #4c4a46;
  --toogleColor: #1985a1;
  --menuBgColor: #4c5c68;
  --menuText: #c5c3c6;
  --menuText_Hover: #1985a1;
  --bkgColor: #fff;

  /* background-color: #999; */
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const AvatarBox = styled.div`
  position: absolute;
  z-index: 1;
  /* background-color: greenyellow; */
  background: none;
  pointer-events: none;
  img {
    width: 4.8em;
    border: 5px solid burlywood;
    border-radius: 50%;
  }
  div {
    position: relative;
    /* background-color: red; */
    background: none;
    top: -12px;
    left: 0;
    width: 100%;
    padding: 3px 0;
    p {
      margin: auto;
      width: 40px;
      padding: 1px 1px;
      background-color: burlywood;
      text-align: center;
      font-size: 18px;
      text-transform: uppercase;
      color: #fff;
      border-radius: 4px;
    }
  }
`;

const CardBody = styled.div`
  background-color: var(--navColor);
  border-radius: 1.2em;
  margin: 10px 10px;
`;

const PreviewBox = styled.a`
  display: block;
  
  padding: 10px;
  display: flex;
  align-items: center;

  /* background-color: #fff; */

  div {
    background-color: #000;
    position: relative;
    width: 100%;
    
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15rem;
    // 透過hidden把超出範圍的圖片直接剪裁掉
    overflow:hidden;
    border-radius: 1.2em;

    img {
      width: 99.9%;
      border-radius: 6px;
    }
  }
`;

const Description = styled.div`
  /* background-color: royalblue; */

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 6px auto;
  border-radius: 10px;
`;

const Owner = styled.div`
  /* background-color: royalblue; */
  width: 100%;
  margin: 0 0 10px;
  height: 56px;
  border-bottom: 1px solid silver;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #fff;
  h1 {
    font-size: 26px;
    line-height: 30px;
    text-align: center;
    letter-spacing: 5px;
  }
`;

const ChTitle = styled.div`
  /* background-color: royalblue; */
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #fff;
  p {
    /* background-color: royalblue; */
    font-size: 16px;
    line-height: 25px;
    padding: 0 20px;
    height: 50px;
    letter-spacing: 1px;
  }
`;

const Detail = styled.div`
  /* background-color: royalblue; */
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  div {
    flex: 1;
    background-color: var(--toogleColor);
    padding: 5px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    svg {
      font-size: 20px;
      color: #fff;
    }

    p {
      font-size: 20px;
      color: #fff;
    }
  }
`;

const Left = styled.div`
  margin: 0 2px 0 5px;
  border-radius: 0 0 0 15px;
`;

const Right = styled.div`
  margin: 0 5px 0 2px;
  border-radius: 0 0 15px 0;
`;

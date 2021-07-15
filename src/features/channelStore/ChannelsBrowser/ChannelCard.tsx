import { useState } from "react";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { ChannelProps, IframeProps, VisitItem } from "../../../app/types";
import * as ai from "react-icons/ai";
import { useDispatch, useSelector } from "../../../app/hooks";
import { setFromChannel } from "../../theater/slice";
import { convertToIframeProps } from "../../theater/api";
import {
  editVisitList,
  removeFavored,
  selectFavoredListMap,
  selectListMap,
  selectVisitStore,
  setFavored,
} from "../../visitStore/slice";
import { convertToVisitItem } from "../api";
import { reqUpdateVisit } from "../../visitStore/api";
import { selectUser } from "../../user/slice";
import { selectChannelTags } from "../slice";

interface ChannelCardProps extends ChannelProps {
  group: string;
}

export function ChannelCard(props: ChannelCardProps) {
  const {
    avatar,
    // cname,
    cid,
    owner,
    status,
    // streamurl,
    thumbnail,
    title,
    viewcount,
    starttime,
    // method,
    // updatetime,
    group:groupName,
  } = props;

  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const handleEnterTheater = () => {
    // 當點選頻道進入Theater。
    const item: IframeProps = convertToIframeProps(props);
    dispatch(setFromChannel({ item }));
  };

  const favoredMap = useSelector(selectFavoredListMap);
  const listMap = useSelector(selectListMap);
  const isList = listMap.has(cid);
  const isFavored = favoredMap.has(cid);
  const heartTheme = getHeartTheme(listMap.has(cid), favoredMap.has(cid));
  const visit = useSelector(selectVisitStore);
  const user = useSelector(selectUser);
  const tags = useSelector(selectChannelTags);

  const onFavoredHeartBtnClick = () => {
    // debugger
    console.log("onClickHeart:", isList , isFavored);
    
    if (isList) {
      var ok = window.confirm(`確定要停止追隨 ${owner} 嗎 ?`);
      if (ok) {
        const newList = visit.list.filter((item: VisitItem) => item.cid !== cid);
        dispatch(editVisitList({ list: newList, group: null }));
        const {username, ssid} = user;
        dispatch(reqUpdateVisit(username, ssid, {list:newList, group:visit.group}, tags));
      } 

      return;
    }

    if (isFavored) {
      // cancelFavored
      dispatch(removeFavored(cid));
    } else {
      // addToFavored
      const item: VisitItem | null = convertToVisitItem(props, groupName);
      if (item !== null) {
        dispatch(setFavored({ item }));
      }
    }
  };

  useEffect(() => {
    const parentDom = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });
    if (parentDom) {
      observer.observe(parentDom);
    }
    return () => {
      if (parentDom) {
        observer.unobserve(parentDom);
      }
      observer.disconnect();
    };
  }, [ref, isVisible]);

  return (
    <Container ref={ref}>
      <AvatarBox>
        <img src={isVisible ? avatar : undefined} alt={"avatar_" + cid} />
        <div>
          <p>{status}</p>
        </div>
      </AvatarBox>
      <FavoredHeartBtn onClick={onFavoredHeartBtnClick} {...heartTheme}>
        {heartTheme.icon}
      </FavoredHeartBtn>
      <CardBody>
        <PreviewBox onClick={handleEnterTheater}>
          <div>
            <img
              src={isVisible ? thumbnail : undefined}
              alt={"thumbnail_" + cid}
            />
          </div>
        </PreviewBox>
        <Description>
          <Owner>
            <h1>{owner}</h1>
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
type HeartThemeType = {
  color: string;
  hoverColor: string;
  icon: any;
};
const getHeartTheme = (
  isLisit: boolean,
  isFavored: boolean
): HeartThemeType => {
  if (isLisit) {
    // 灰色實心
    return {
      color: "#1985a1;",
      hoverColor: "#666;",
      icon: <ai.AiFillHeart />,
    };
  } else {
    if (isFavored) {
      // 在favored中
      return {
        color: "#ee5253",
        hoverColor: "#ee5253",
        icon: <ai.AiFillHeart />,
      };
    } else {
      // 不在favored中
      return {
        color: "#aaa",
        hoverColor: "#ee5253",
        icon: <ai.AiOutlineHeart />,
      };
    }
  }
};

const FavoredHeartBtn = styled.div<HeartThemeType>`
  position: absolute;
  transform: translate(-50%, -50%);
  right: 0.5em;
  top: 2.5em;
  z-index: 1;

  text-align: center;
  cursor: pointer;

  width: 40px;
  height: 40px;
  background-color: none;

  svg {
    font-size: 35px;
    color: ${(p) => p.color};
    transition: 0.1s;
  }

  :hover {
    svg {
      font-size: 38px;
      color: ${(p) => p.hoverColor};
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

  //點擊後將跳轉到Theater
  cursor: pointer;

  div {
    background-color: #000;
    position: relative;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    height: 15rem;
    // 透過hidden把超出範圍的圖片直接剪裁掉
    overflow: hidden;
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
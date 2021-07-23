import * as ai from "react-icons/ai";
import { ReactElement, useEffect, useRef, useState, Fragment } from "react";
import { useDispatch } from "../../app/hooks";
import { ChannelCardProps } from "../../app/types";
import { setFromChannel } from "../theater/slice";
import styled from "styled-components";
import { setChannelCard, setSearchResult } from "./slice";
import { CHANNELS_DEFAULT_GROUPNAME } from "../../app/config";

export function ChannelCard(props: ChannelCardProps) {
  const {
    avatar,
    // cname,
    cid,
    owner,
    status,
    // streamurl,
    // thumbnail,
    title,
    viewcount,
    starttime,
    // method,
    // updatetime,
    group: groupName,
    heart,
  } = props;
  const item = props;
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  // heartTheme
  const heartTheme = getHeartTheme(heart);

  const dispatch = useDispatch();

  const handleEnterTheater = () => {
    // 當點選頻道進入Theater。
    dispatch(setFromChannel({ item }));
  };

  const onFavoredHeartBtnClick = () => {
    const card: ChannelCardProps = { ...props, heart: !heart };
    if (groupName !== "Search Result") {
      dispatch(
        setChannelCard({
          card,
          options: {
            isChanged: false,
            isNewAdded: groupName === CHANNELS_DEFAULT_GROUPNAME,
            isDeleted: false,
          },
        })
      );
    } else {
      dispatch(
        setSearchResult({
          current: { ...props, heart: !heart },
        })
      );
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
      {status !== "failure" ? (
        <>
          <AvatarBox {...getAvatarStyles(status)}>
            <img src={isVisible ? avatar : undefined} alt={"avatar_" + cid} />
            <div>
              <p>{status}</p>
            </div>
          </AvatarBox>
          <FavoredHeartBtn onClick={onFavoredHeartBtnClick} {...heartTheme}>
            {heartTheme.icon}
          </FavoredHeartBtn>
        </>
      ) : (
        <Fragment />
      )}
      <CardBody>
        <PreviewBox onClick={handleEnterTheater}>
          {GetImg(props, isVisible)}
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
              <p>{status === "live" ? "熱映中" : starttime}</p>
            </Right>
          </Detail>
        </Description>
      </CardBody>
    </Container>
  );
}

const GetImg = (current: any, isVisible: boolean): ReactElement =>
  // current === null ? (
  //   <div>
  //     <ai.AiOutlineFundView />
  //     <p>一緒にddしましょう o(*￣▽￣*)ブ</p>
  //   </div>
  // ) :
  current.thumbnail === "" ? (
    <div>
      <ai.AiFillFrown />
      <p>獲取頻道訊息發生錯誤</p>
    </div>
  ) : (
    <div>
      <img
        src={isVisible ? current.thumbnail : undefined}
        alt={"thumbnail_" + current.cid}
      />
    </div>
  );

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

type AvatarStyle = {
  fontcolor: string;
  fontbgcolor: string;
  bordercolor: string;
};

const getAvatarStyles = (status: string): AvatarStyle => {
  switch (status) {
    case "live":
      return {
        fontcolor: "#fff",
        fontbgcolor: "#ee5253",
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

const AvatarBox = styled.div<AvatarStyle>`
  position: absolute;
  z-index: 1;
  background: none;
  pointer-events: none;
  img {
    width: 4.8em;
    border: 5px solid ${(p) => p.fontbgcolor};
    border-radius: 50%;
  }
  div {
    position: relative;
    background: none;
    top: -12px;
    left: 0;
    width: 100%;
    padding: 3px 0;
    p {
      margin: auto;
      width: 48px;
      padding: 1px 1px;
      color: ${(p) => p.fontcolor};
      background-color: ${(p) => p.fontbgcolor};
      text-align: center;
      font-size: 18px;
      text-transform: uppercase;
      border-radius: 3px;
    }
  }
`;

type HeartThemeType = {
  color: string;
  hoverColor: string;
  icon: any;
};
export const getHeartTheme = (type: boolean): HeartThemeType => {
  switch (type) {
    case true:
      return {
        color: "#ee5253",
        hoverColor: "#ee5253",
        icon: <ai.AiFillHeart />,
      };

    case false:
      return {
        color: "#aaa",
        hoverColor: "#ee5253",
        icon: <ai.AiOutlineHeart />,
      };
    default:
      throw new Error("沒有定義得型態錯誤!");
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 15rem;
    // 透過hidden把超出範圍的圖片直接剪裁掉
    overflow: hidden;
    border-radius: 1.2em;

    color: var(--toogleColor);

    // 頻道正確顯示時
    img {
      width: 99.9%;
      border-radius: 6px;
    }

    // 錯誤提示訊息
    svg {
      margin: 0 0 10px 0;
      font-size: 150px;
    }
    p {
      font-size: 20px;
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
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  div {
    height: 40px;
    flex: 1;
    background-color: var(--toogleColor);
    padding: 5px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Left = styled.div`
  margin: 0 2px 0 5px;
  border-radius: 0 0 0 15px;

  svg {
    font-size: 20px;
    color: #fff;
  }

  p {
    letter-spacing: 1px;
    font-size: 14px;
    color: #fff;
  }
`;

const Right = styled.div`
  margin: 0 5px 0 2px;
  border-radius: 0 0 15px 0;

  svg {
    font-size: 20px;
    color: #fff;
  }

  p {
    letter-spacing: 1px;
    font-size: 14px;
    color: #fff;
  }
`;

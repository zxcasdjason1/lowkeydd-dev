import * as ai from "react-icons/ai";
import styled from "styled-components";
import { useDispatch, useSelector } from "../../../app/hooks";
import { selectFavoredList, selectVisitStore } from "../../visitStore/slice";
import { selectUser } from "../../user/slice";
import { reqEditVisit, reqUpdateVisit } from "../../visitStore/api";
import { useLayoutEffect } from "react";
import { ChannelsCollections } from "./Collections";
import { selectChannelTags } from "../slice";
import { history } from "../../..";

export function ChannelsCollector() {
  const user = useSelector(selectUser);
  const visitStore = useSelector(selectVisitStore);
  const favored = useSelector(selectFavoredList);
  const tags = useSelector(selectChannelTags);

  const isLogin = user.ssid !== "";
  const isEdited = visitStore.isListChanged || favored.length > 0;
  const headerTheme = getHeaderIcon(isLogin, isEdited);

  const dispatch = useDispatch();

  const onUpdateClick = () => {
    if (isLogin) {
      if  (isEdited){
        const { username, ssid } = user;
        dispatch(reqUpdateVisit(username, ssid, visitStore, tags));
      }else{
        history.push({ pathname: "/channels/" });
        return
      }
    } else {
      history.push({ pathname: "/login/" });
    }
  };

  useLayoutEffect(() => {
    const { username, ssid } = user;
    dispatch(reqEditVisit(username, ssid, favored));
    return () => {};
  }, [dispatch, user, favored]);

  return (
    <Container>
      <Header onClick={onUpdateClick} {...headerTheme}>
        <p>{headerTheme.text}</p>
        {headerTheme.icon}
      </Header>
      <Content>
        <ChannelsCollections />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  --navColor: #4c4a46;
  --toogleColor: #1985a1;
  --menuBgColor: #4c5c68;
  --menuText: #c5c3c6;
  --menuText_Hover: #1985a1;
  --logoColor: #fff;

  position: absolute;
  top: 55px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: 960px;
  height: 90vh;
  background-color: #222;
  z-index: 2;
  overflow-y: auto;
  h1 {
    //cname
    color: #fff;
    font-size: 50px;
  }
`;

type HeaderThemeType = {
  color: string;
  hoverColor: string;
  icon: any;
  text: string;
};
const getHeaderIcon = (
  isLogin: boolean,
  isEdited: boolean
): HeaderThemeType => {
  // debugger
  if (!isLogin) {
    // login first
    return {
      text: "請先登入唷o(*￣▽￣*)ブ",
      color: "#1985a1",
      hoverColor: "#fff",
      icon: <ai.AiOutlineUser />,
    };
  }
  if (isEdited) {
    // should update
    return {
      text: "上傳檔案",
      color: "#1985a1",
      hoverColor: "#fff",
      icon: <ai.AiOutlineCloudUpload />,
    };
  } else {
    // colsed
    return {
      text: "直接關閉",
      color: "#1985a1",
      hoverColor: "#fff",
      icon: <ai.AiOutlineClose />,
    };
  }
};

const Header = styled.div<HeaderThemeType>`
  position: relative;
  background-color: var(--navColor);
  width: 100%;
  height: 65px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  font-size: 50px;
  svg {
    padding-right: 5px;
    color: ${(p) => p.color};
  }

  :hover {
    background-color: var(--menuText_Hover);
    svg {
      color: ${(p) => p.hoverColor};
    }
  }
`;

const Content = styled.div`
  position: relative;
`;

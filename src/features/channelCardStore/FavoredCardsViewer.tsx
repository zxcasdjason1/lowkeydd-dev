import * as ai from "react-icons/ai";
import styled from "styled-components";
import { useDispatch, useSelector } from "../../app/hooks";
import { FavoredItem, VisitList } from "../../app/types";
import { selectIsLogin, selectUser } from "../user/slice";
import { FavoredCardsGroup } from "./FavoredCardsGroup";
import { Fragment } from "react";
import {
  selectFavoredCardsList,
  selectGroup,
  selectIsFavoredCardsListChanged,
  selectTags,
  selectVisitList,
} from "./slice";
import { reqUpdateVisit } from "./api";
import { history } from "../..";
import { useLayoutEffect } from "react";

/**
 * 收藏品，表列出已登入使用者自定義的喜好頻道列表
 */
export function FavoredCardsViewer() {
  const { username, ssid } = useSelector(selectUser);
  const isLogin: boolean = useSelector(selectIsLogin);
  const isListChanged: boolean = useSelector(selectIsFavoredCardsListChanged);
  const headerTheme: HeaderThemeType = getHeaderIcon(isLogin, isListChanged);
  const favoredlist: FavoredItem[][] = useSelector(selectFavoredCardsList);
  const group = useSelector(selectGroup);
  const visit: VisitList = useSelector(selectVisitList);
  const tags: string[] = useSelector(selectTags);

  const dispatch = useDispatch();

  const onHeaderBtnClick = () => {
    if (!isLogin) {
      // 請先登入
      history.push({ pathname: "/login/" });
    } else if (isListChanged) {
      // 上傳檔案
      dispatch(reqUpdateVisit(username, ssid, visit, tags));
    }else{
      // 直接關閉
      history.goBack();
    }
  };

  useLayoutEffect(() => {
    return () => {};
  }, []);

  return (
    <ViewerContainer>
      <Header {...headerTheme}>
        <div onClick={onHeaderBtnClick}>
          {headerTheme.icon}
          <p>{headerTheme.text}</p>
        </div>
      </Header>
      <Content>
        {favoredlist.map((items: FavoredItem[], i) => {
          // 驗證groupname
          // 根據分群顯示
          const groupName = group[i];
          return items.length > 0 ? (
            <FavoredCardsGroup
              key={"GroupVisitItems_" + groupName}
              items={items}
              groupName={groupName}
            />
          ) : (
            <Fragment key={"GroupVisitItems_" + groupName} />
          );
        })}
      </Content>
    </ViewerContainer>
  );
}

const ViewerContainer = styled.div`
  --btnTextColor: #fff;
  --btnTextHoverColor: #fff;
  --btnBgColor: rgba(25, 133, 161, 0.5);
  --btnBgHoverColor: rgb(25, 133, 161);
  --groupTextColor: rgb(25, 133, 161);
  --toogleColor: #fff;
  --bkgColor: #4c4a46;

  position: fixed;
  top: 65px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  height: calc(100vh - 65px);
  background-color: var(--bkgColor);
  overflow-y: auto;
`;

type HeaderThemeType = {
  icon: any;
  text: string;
};
const getHeaderIcon = (
  isLogin: boolean,
  isChanged: boolean
): HeaderThemeType => {
  // debugger
  if (!isLogin) {
    // login first
    return {
      text: "請先登入",
      icon: <ai.AiOutlineUser />,
    };
  }
  if (isChanged) {
    // should update
    return {
      text: "上傳檔案",
      icon: <ai.AiOutlineCloudUpload />,
    };
  } else {
    // colsed
    return {
      text: "直接關閉",
      icon: <ai.AiOutlineClose />,
    };
  }
};

const Header = styled.div<HeaderThemeType>`
  position: relative;
  background-color: var(--navColor);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    position: relative;
    width: 100%;
    margin: 10px 20px 0;
    padding: 15px 0;
    border-radius: 30px;
    font-weight: 700px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: var(--btnTextColor);
    background-color: var(--btnBgColor);
    cursor: pointer;
    border: 2px solid;
    transition: 0.5s;

    svg {
      font-size: 8vmin;
      padding-right: 5px;
      transition: 0.2s;
    }

    p {
      letter-spacing: 1vmin;
      font-size: 6vmin;
      transition: 0.2s;
    }

    :hover {
      color: var(--btnTextHoverColor);
      background-color: var(--btnBgHoverColor);

      svg {
        font-size: 9vmin;
      }

      p {
        font-size: 8vmin;
      }
    }
  }
`;

const Content = styled.div`
  position: relative;
`;

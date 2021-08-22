import styled from "styled-components";
import { useSelector } from "../../app/hooks";
import { FavoredItem } from "../../app/types";
import { FavoredCardsGroup } from "./FavoredCardsGroup";
import { Fragment } from "react";
import { selectFavoredCardsList, selectGroup } from "./slice";

/**
 * 收藏品，表列出已登入使用者自定義的喜好頻道列表
 */
export function FavoredCardsViewer() {
  const favoredCardsList: FavoredItem[][] = useSelector(selectFavoredCardsList);
  const group = useSelector(selectGroup);

  return (
    <ViewerContainer>
      {/* <Header {...headerTheme}>
        <div onClick={onHeaderBtnClick}>
          {headerTheme.icon}
          <p>{headerTheme.text}</p>
        </div>
      </Header> */}
      <Content>
        {favoredCardsList.map((items: FavoredItem[], i) => {
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

  position: absolute;
  top: 65px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  height: calc(100vh - 65px);
  background: #4c5c68;
  overflow-y: auto;
`;

// type HeaderThemeType = {
//   icon: any;
//   text: string;
// };
// const getHeaderIcon = (
//   isLogin: boolean,
//   isChanged: boolean
// ): HeaderThemeType => {
//   // debugger
//   if (!isLogin) {
//     // login first
//     return {
//       text: "請先登入",
//       icon: <ai.AiOutlineUser />,
//     };
//   }
//   if (isChanged) {
//     // should update
//     return {
//       text: "保存修改",
//       icon: <ai.AiOutlineCloudUpload />,
//     };
//   } else {
//     // colsed
//     return {
//       text: "直接關閉",
//       icon: <ai.AiOutlineClose />,
//     };
//   }
// };

// const Header = styled.div<HeaderThemeType>`
//   position: relative;
//   background-color: var(--navColor);
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   div {
//     position: relative;
//     width: 100%;
//     margin: 10px 20px 0;
//     padding: 15px 0;
//     border-radius: 30px;
//     font-weight: 700px;
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     justify-content: center;
//     color: var(--btnTextColor);
//     background-color: var(--btnBgColor);
//     cursor: pointer;
//     border: 2px solid;
//     transition: 0.5s;

//     svg {
//       font-size: 8vmin;
//       padding-right: 5px;
//       transition: 0.2s;
//     }

//     p {
//       letter-spacing: 1vmin;
//       font-size: 6vmin;
//       transition: 0.2s;
//     }

//     :hover {
//       color: var(--btnTextHoverColor);
//       background-color: var(--btnBgHoverColor);

//       svg {
//         font-size: 9vmin;
//       }

//       p {
//         font-size: 8vmin;
//       }
//     }
//   }
// `;

const Content = styled.div`
  position: relative;
`;

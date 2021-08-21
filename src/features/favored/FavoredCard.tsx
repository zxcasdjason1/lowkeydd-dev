import * as ai from "react-icons/ai";
import styled from "styled-components";
import { useDispatch, useSelector } from "../../app/hooks";
import { FavoredItem } from "../../app/types";
import { selectFavoredList, selectGroup, setFavoredList } from "./slice";

export function FavoredCard(props: FavoredItem) {
  const {
    cid: Cid,
    group: groupName,
    owner,
    cname,
    avatar,
    isDeleted,
    isNewAdded,
  } = props;
  const list = useSelector(selectFavoredList);
  const group = useSelector(selectGroup);

  const dispatch = useDispatch();

  const getEditedList = (newItem: FavoredItem): FavoredItem[] => {
    const newList = list.filter(
      (item: FavoredItem) => item.cid !== newItem.cid
    );
    return [newItem, ...newList];
  };

  const getDeletedList = (newItem: FavoredItem): FavoredItem[] => {
    const newList = list.map((item: FavoredItem) =>
      item.cid !== newItem.cid ? item : newItem
    );
    return [...newList];
  };

  const handleGroupEdit = () => {
    // 取得新的狀態
    const newGroupName = window.prompt("指定為新的群組? ", groupName);

    if (newGroupName == null) {
      return;
    }
    if (newGroupName === "") {
      alert("不可以為空白");
      return;
    }

    // 加入到新的群組
    if (newGroupName !== groupName) {
      // 修改該元素的群組屬性
      const newList: FavoredItem[] = getEditedList({
        ...props,
        isChanged: true, //添加變更紀錄
        group: newGroupName,
      });

      const newGroup: string[] = [
        newGroupName,
        ...group.filter((g: string) => g !== newGroupName),
      ];
      dispatch(setFavoredList({ group: newGroup, list: newList }));
    }
  };

  const handleItemEdit = () => {
    var newOwner = window.prompt("輸入新的頻道名稱 ? ", owner);
    if (newOwner == null) {
      return;
    }
    if (newOwner === "") {
      alert("不可以為空白");
      return;
    }
    const newList = getEditedList({
      ...props,
      isChanged: true, //添加變更紀錄
      owner: newOwner,
    });
    dispatch(setFavoredList({ list: newList, group: null }));
  };

  const handleItemDelete = () => {
    var ok = window.confirm(`確定要停止追隨 ${owner} 嗎 ?`);
    if (ok) {
      const newList = getDeletedList({
        ...props,
        isDeleted: true, //添加變更紀錄
        group: groupName,
      });
      dispatch(setFavoredList({ list: newList, group: null }));
    } else {
      return;
    }
  };

  const cancelDelete = () => {
    const newList = getDeletedList({
      ...props,
      isDeleted: false, //添加變更紀錄
      group: groupName,
    });
    dispatch(setFavoredList({ list: newList, group: null }));
  };

  return (
    <Container>
      <Avatar>
        <img src={avatar} alt={`${cname}'s avatar`} />
      </Avatar>
      <OwnerText isDeleted={isDeleted} isNewAdded={isNewAdded}>
        <label htmlFor={Cid}>{owner}</label>
      </OwnerText>
      <ButtonGroup>
        <Button onClick={handleGroupEdit}>
          <ai.AiOutlineGroup />
          <p>{owner}</p>
        </Button>
        <Button onClick={handleItemEdit}>
          <ai.AiOutlineEdit />
          <p>{owner}</p>
        </Button>
        {isDeleted ? (
          <Button onClick={cancelDelete}>
            <ai.AiOutlineRedo />
            <p>{owner}</p>
          </Button>
        ) : (
          <Button onClick={handleItemDelete}>
            <ai.AiTwotoneDelete />
            <p>{owner}</p>
          </Button>
        )}
      </ButtonGroup>
    </Container>
  );
}
const Container = styled.div`
  --navColor: #4c4a46;
  --btnHoverColor: rgb(25, 133, 161);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #c5c3c6;
  padding: 16px;
  margin: 6px auto;
  border-radius: 10px;
`;

const Avatar = styled.div`
  margin-right: 15px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;

  img {
    min-width: 50px;
    max-width: 100px;
    background-color: #999;
    border-radius: 15px;
    width: 4rem;
    height: 4rem;
    height: auto;
  }
`;

const OwnerText = styled.div<{ isDeleted: boolean; isNewAdded: boolean }>`
  width: 100%;
  padding: 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${(p) => (p.isNewAdded ? `#f00` : p.isDeleted ? `#888` : `#fff`)};
  label {
    text-decoration: ${(p) => (p.isDeleted ? `line-through` : `none`)};
    font-size: 18px;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;
const Button = styled.div`
  margin-left: 12px;
  padding: 5px 5px;
  cursor: pointer;
  font-size: 25px;
  border-radius: 50%;
  color: #fff;
  p {
    display: none;
  }
  :hover {
    color: var(--btnHoverColor);
    background-color: #fff;
  }
`;

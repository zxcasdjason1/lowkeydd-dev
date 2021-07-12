import styled from "styled-components";
import * as ai from "react-icons/ai";
import { VisitItem } from "../../../app/types";
import { useDispatch, useSelector } from "../../../app/hooks";
import { selectVisitStore, setVisitList, setWholeVisit } from "../slice";

type VisitEditorItemProps = {
  item: VisitItem;
};

export default function VisitEditorItem(props: VisitEditorItemProps) {
  const { list, group } = useSelector(selectVisitStore);
  const { item } = props;

  const dispatch = useDispatch();

  const getEditedList = (newItem: VisitItem): VisitItem[] => {
    const newList = list.filter((item: VisitItem) => item.cid !== newItem.cid);
    return [newItem, ...newList];
  };

  const getDeletedList = (cid: string): VisitItem[] => {
    const newList = list.filter((item: VisitItem) => item.cid !== cid);
    return [...newList];
  };

  const handleGroupEdit = () => {
    // 取得新的狀態
    const newGroupName = window.prompt("指定為新的群組? ", item.group);

    if (newGroupName == null) {
      return;
    }
    if (newGroupName == "") {
      alert("不可以為空白");
      return;
    }

    // 加入到新的群組
    if (newGroupName !== item.group) {
      // 修改該元素的群組屬性
      const newList: VisitItem[] = getEditedList({
        ...item,
        group: newGroupName,
      });

      const newGroup: string[] = [
        newGroupName,
        ...group.filter((g: string) => g !== newGroupName),
      ];
      dispatch(setWholeVisit({ group: newGroup, list: newList }));
    }
  };

  const handleItemEdit = () => {
    var newOwner = window.prompt("輸入新的頻道名稱? ", item.cname);
    if (newOwner == null) {
      return;
    }
    if (newOwner == "") {
      alert("不可以為空白");
      return;
    }
    const newList = getEditedList({
      ...item,
      owner: newOwner,
    });
    dispatch(setVisitList(newList));
  };

  const handleItemDelete = () => {
    var ok = window.confirm(`確定要刪掉 ${item.cname} 嗎?`);
    if (ok) {
      const newList = getDeletedList(item.cid);
      dispatch(setVisitList(newList));
    } else {
      return;
    }
  };

  return (
    <Container>
      <OwnerText>
        <label htmlFor={item.cid}>{item.owner}</label>
      </OwnerText>
      <ButtonGroup>
        <Button onClick={handleGroupEdit}>
          <ai.AiOutlineGroup />
          <p>{item.owner}</p>
        </Button>
        <Button onClick={handleItemEdit}>
          <ai.AiOutlineEdit />
          <p>{item.owner}</p>
        </Button>
        <Button onClick={handleItemDelete}>
          <ai.AiTwotoneDelete />
          <p>{item.owner}</p>
        </Button>
      </ButtonGroup>
    </Container>
  );
}
const Container = styled.div`
  --navColor: #4c4a46;
  --btnHoverColor: rgb(25, 133, 161);
  /* --btnHoverBgColor: rgba(25, 133, 161, 0.5);
  --toogleColor: #fff;
  --bkgColor: #999; */

  box-sizing: border-box;

  display: flex;
  justify-content: space-between;

  align-items: center;
  background-color: #c5c3c6;
  padding: 16px;
  margin: 6px auto;
  border-radius: 10px;

  // 最大寬度
  /* max-width: 480px; */
`;
const OwnerText = styled.div`
  width: 100%;
  padding: 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
  label {
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
  font-size: 22px;
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

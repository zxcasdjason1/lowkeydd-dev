import styled from "styled-components";
import * as ai from "react-icons/ai";
import { VisitItem } from "../../../types";
import { useDispatch, useSelector } from "../../../app/hooks";
import { setVisitList, setWholeVisit } from "../slice";

type VisitEditorItemProps = {
  item: VisitItem;
};

export default function VisitEditorItem(props: VisitEditorItemProps) {
  const { item } = props;

  const visit = useSelector((state) => state.visit);
  const dispatch = useDispatch();

  const getEditedList = (newItem: VisitItem): VisitItem[] => {
    const newList = visit.list.filter((item) => item.cid !== newItem.cid);
    return [newItem, ...newList];
  };

  const getDeletedList = (cid: string): VisitItem[] => {
    const newList = visit.list.filter((item) => item.cid !== cid);
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
      const newList = getEditedList({
        ...item,
        group: newGroupName,
      });

      if (visit.group.includes(newGroupName)) {
        dispatch(setVisitList(newList));
      } else {
        // 加入此創建的群組名
        const newGroup = [newGroupName, ...visit.group];
        dispatch(setWholeVisit({ group: newGroup, list: newList }));
      }
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
        {/* <input type="checkbox" checked={checked} onChange={handleChecked} /> */}
        <label htmlFor={item.cid}>{item.owner}</label>
      </OwnerText>
      <ButtonGroup>
        <Button onClick={handleGroupEdit}>
          <ai.AiOutlineGroup />
          <span>{item.owner}</span>
        </Button>
        <Button onClick={handleItemEdit}>
          <ai.AiOutlineEdit />
          <span>{item.owner}</span>
        </Button>
        <Button onClick={handleItemDelete}>
          <ai.AiTwotoneDelete />
          <span>{item.owner}</span>
        </Button>
      </ButtonGroup>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: space-between;

  align-items: center;
  background-color: #c5c3c6;
  padding: 18px;
  margin: 6px auto;
  border-radius: 5px;
  width: 80%;
`;
const OwnerText = styled.div`
  label {
    color: #fff;
    font-size: 18px;
    overflow: hidden;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const Button = styled.div`
  margin-left: 20px;
  font-size: 25px;

  color: #fff;
  cursor: pointer;
  span {
    display: none;
  }
`;

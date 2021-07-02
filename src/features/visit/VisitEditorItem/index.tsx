import styled from "styled-components";
import * as ai from "react-icons/ai";
import { VisitItem } from "../../../types";

type VisitEditorItemProps = {
  item: VisitItem;
  editItem: (newItem: VisitItem) => void;
  deleteItem: (cid: string) => void;
};

export default function VisitEditorItem(props: VisitEditorItemProps) {
  const { item } = props;
  const {cid, owner} = item;

  const handleItemEdit = () => {
    var newOwner = window.prompt("請輸入新的頻道稱呼");
    if (newOwner == null) {
      alert("不可以空白");
      return;
    } else {
      props.editItem({
        ...item,
        owner: newOwner,
      });
    }
  };

  const handleItemDelete = () => {
    var ok = window.confirm("確定要刪掉嗎?");
    if (ok) {
      props.deleteItem(cid);
    } else {
      return;
    }
  };

  return (
    <Container>
      <OwnerText>
        {/* <input type="checkbox" checked={checked} onChange={handleChecked} /> */}
        <label htmlFor={cid}>{owner}</label>
      </OwnerText>
      <ButtonGroup>
        <Button onClick={handleItemEdit}>
          <ai.AiOutlineEdit />
          <span>{owner}</span>
        </Button>
        <Button onClick={handleItemDelete}>
          <ai.AiTwotoneDelete />
          <span>{owner}</span>
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

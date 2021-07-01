import { useState, useEffect } from "react";
import VisitEditorItem from "../../components/VisitEditorItem";
import VisitEditorHeader from "../../components/VisitEditorHeader";
import styled from "styled-components";
import { VisitItem } from "../../types";
import { editVisit, getVisitItem, updateVisit } from "./api";
import { useDispatch,useSelector } from "../../app/hooks";

export function VisitEditor() {
  const [visitList, setVisitList] = useState<Array<VisitItem>>([]);
  const user = useSelector(state => state.user)
  const visit = useSelector(state => state.visit)
  const dispatch = useDispatch()

  const addNewItem = (url: string) => {
    getVisitItem(url)
  };
  const editItem = (newItem: VisitItem) => {
    const newVisitList = visitList.filter((item) => item.cid !== newItem.cid);
    setVisitList([newItem, ...newVisitList]);
  };
  const deleteItem = (cid: string) => {
    const newVisitList = visitList.filter((item) => item.cid !== cid);
    setVisitList([...newVisitList]);
  };

  useEffect(() => {
    //componentDidMount
    dispatch(editVisit(user.username));
    return () => {
      // componentWillUnmount
    };
  }, []);

  const onUpdate = ()=>{
    dispatch(updateVisit(user.username, visit))
  }

  return (
    <div>
      <VisitEditorHeader addNewItem={addNewItem}></VisitEditorHeader>

      <ul>
        {visitList.map((item) => (
          <VisitEditorItem
            key={item.cid}
            item = {item}
            editItem={editItem}
            deleteItem={deleteItem}
          />
        ))}
      </ul>

      <UpdateBtn onClick={onUpdate}>Save</UpdateBtn>
    </div>
  );
}

const UpdateBtn = styled.div`
  background: #333;
  margin: 0px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 35px;
  cursor: pointer;

  padding: 1rem;
  width: 95%;
  border-radius: 5px;
  box-shadow: 0px 15px 10px -15px #000;
`;

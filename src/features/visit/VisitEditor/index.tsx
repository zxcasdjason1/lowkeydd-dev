import { useState, useEffect } from "react";
import VisitEditorItem from "../VisitEditorItem";
import VisitEditorHeader from "../VisitEditorHeader";
import styled from "styled-components";
import { VisitItem } from "../../../types";
import { reqEditVisit, reqUpdateVisit, reqSearchChannel } from "../api";
import { useDispatch, useSelector } from "../../../app/hooks";
import { setVisitList } from "../slice";

export function VisitEditor() {
  const user = useSelector((state) => state.user);
  const visit = useSelector((state) => state.visit);

  const dispatch = useDispatch();

  const editItem = (newItem: VisitItem) => {
    const newList = visit.list.filter((item) => item.cid !== newItem.cid);
    dispatch(setVisitList([newItem, ...newList]));
  };
  const deleteItem = (cid: string) => {
    const newList = visit.list.filter((item) => item.cid !== cid);
    dispatch(setVisitList([...newList]));
  };

  useEffect(() => {
    //componentDidMount
    dispatch(reqEditVisit(user.username));
    return () => {
      // componentWillUnmount
    };
  }, []);

  const onUpdate = () => {
    dispatch(reqUpdateVisit(user.username, visit));
  };

  return (
    <div>
      <VisitEditorHeader></VisitEditorHeader>

      <ul>
        {visit.list.map((item) => (
          <VisitEditorItem
            key={item.cid}
            item={item}
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

import { useEffect } from "react";
import VisitEditorItem from "../VisitEditorItem";
import VisitEditorHeader from "../VisitEditorHeader";
import styled from "styled-components";
import { reqEditVisit, reqUpdateVisit } from "../api";
import { useDispatch, useSelector } from "../../../app/hooks";
import { VisitItem } from "../../../types";
import { Fragment } from "react";

export function VisitEditor() {
  const { username, ssid } = useSelector((state) => state.user);
  const groupedVisitItems = useSelector((state) => state.groupedVisitItems);
  const { view, group } = groupedVisitItems;
  console.log("view: ", { view });
  console.log("group: ", [group]);

  const dispatch = useDispatch();

  const onUpdate = () => {
    console.log("onUpdate", { groupedVisitItems });
    dispatch(reqUpdateVisit(username, ssid, groupedVisitItems));
  };

  useEffect(() => {
    //componentDidMount
    dispatch(reqEditVisit(username, ssid));
    return () => {
      // componentWillUnmount
    };
  }, []);

  return (
    <>
      <VisitEditorHeader />
      {view.map((items, i) =>
        items.length > 0 ? (
          <GroupVisitItems
            key={"GroupVisitItems_" + group[i]}
            items={items}
            groupName={group[i]}
          />
        ) : (
          <Fragment />
        )
      )}
      <UpdateBtn onClick={onUpdate}>Save</UpdateBtn>
    </>
  );
}

function GroupVisitItems(props: { items: VisitItem[]; groupName: string }) {
  const { items, groupName } = props;
  return (
    <>
      <p>{groupName || "resident"}</p>
      <div>
        {items.map((item: VisitItem) => (
          <VisitEditorItem key={item.cid} item={item} />
        ))}
      </div>
    </>
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

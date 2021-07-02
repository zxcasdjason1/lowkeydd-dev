import { useEffect } from "react";
import VisitEditorItem from "../VisitEditorItem";
import VisitEditorHeader from "../VisitEditorHeader";
import styled from "styled-components";
import { reqEditVisit, reqUpdateVisit } from "../api";
import { useDispatch, useSelector } from "../../../app/hooks";
import { useGrouped } from "../../../app/share";

export function VisitEditor() {
  const user = useSelector((state) => state.user);
  const visit = useSelector((state) => state.visit);
  const newVisitList = useGrouped(visit.list, visit.list);
  console.log({newVisitList})

  const dispatch = useDispatch();

  const onUpdate = () => {
    console.log("onUpdate", { visit });
    dispatch(reqUpdateVisit(user.username, visit));
  };

  useEffect(() => {
    //componentDidMount
    dispatch(reqEditVisit(user.username));
    return () => {
      // componentWillUnmount
    };
  }, []);

  return (
    <div>
      <VisitEditorHeader />

      {Object.keys(newVisitList).map((groupName, i) => (
        <>
          <p>{groupName}</p>
          <ul key={groupName + "_" + i}>
            {newVisitList[groupName].map((item) => 
              <VisitEditorItem key={item.cid} item={item} />
            )}
          </ul>
        </>
      ))}
      <UpdateBtn onClick={onUpdate}>Save</UpdateBtn>
    </div>
  );
}

// const getGroupedVisitList = (list:VisitItem[]): { [key: string]: VisitItem[] } =>{
//   if (!list){
//     return {};
//   }
//   const mp = new Map<string, VisitItem>();
//   list.forEach((item) => {
//     mp.set(item.cid, item);
//   });
//   const result: { [key: string]: VisitItem[] } = {};
//   const resident:VisitItem[] = [];

//   list.forEach((item) => {
//     const { cid } = item;

//     if (mp.has(cid)) {
//       const groupName = mp.get(cid)?.group || "undefined";
//       if (!result[groupName]) {
//         result[groupName] = [item];
//       } else {
//         result[groupName].push(item);
//       }
//     } else {
//       resident.push(item);
//     }
//   });

//   return {...result, resident}
// }

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

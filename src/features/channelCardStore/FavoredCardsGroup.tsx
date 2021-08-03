import styled from "styled-components";
import { VISITS_DEFAULT_GROUPNAME } from "../../app/config";
import { FavoredItem } from "../../app/types";
import { FavoredCard } from "./FavoredCard";
import GroupLine from "../../components/GroupLine";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { selectFavoredList, setFavoredList } from "./slice";
// import { useDispatch, useSelector } from "../../app/hooks";

export function FavoredCardsGroup(props: {
  items: FavoredItem[];
  groupName: string;
}) {
  const groupName = props.groupName || VISITS_DEFAULT_GROUPNAME;
  // const favoredlist = useSelector(selectFavoredList);
  // const dispatch = useDispatch();

  // const onDragEnd = (e: any) => {
  //   const src = e.source.index;
  //   const dest = e.destination.index;
  //   if (src === undefined || dest === undefined || src === dest) {
  //     return;
  //   }
  //   console.log(`onDragEnd: src: ${src}, dest: ${dest}`);
  //   const newList = [...favoredlist];
  //   // 從src位置刪除1個元素，並返回該刪除元素形成的陣列
  //   const [deleted] = newList.splice(src, 1);
  //   // 再將被移出的元素，從新放置到該陣列裡面。
  //   newList.splice(dest, 0, { ...deleted, isChanged: true }); // 表示在dest後，(0)不刪除任何元素，把deleted隨後添加進去。
  //   dispatch(setFavoredList({ list: newList, group: null }));
  // };
  return (
    <>
      <GroupLine
        groupName={groupName}
        fontsize={"30px"}
        lineColor={"rgb(25, 133, 161)"}
        bkgColor={"#4c4a46"}
      />
      <Content>
        {props.items.map((item: FavoredItem) => (
          <li key={"FavoredCard_" + item.cid}>
            <FavoredCard {...item} />
          </li>
        ))}
      </Content>
    </>
  );
}

const Content = styled.ul`
  max-width: 960px;
  width: 99%;
  margin: auto;
`;

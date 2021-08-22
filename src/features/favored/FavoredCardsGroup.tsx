import styled from "styled-components";
import { VISITS_DEFAULT_GROUPNAME } from "../../app/config";
import { FavoredItem } from "../../app/types";
import { FavoredCard } from "./FavoredCard";
import GroupLine from "../../components/GroupLine";

export function FavoredCardsGroup(props: {
  items: FavoredItem[];
  groupName: string;
}) {
  const groupName = props.groupName || VISITS_DEFAULT_GROUPNAME;

  return (
    <>
      <GroupLine
        groupName={groupName}
        fontsize={"30px"}
        lineColor={"rgb(25, 133, 161)"}
        bkgColor={"#4c5c68"}
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

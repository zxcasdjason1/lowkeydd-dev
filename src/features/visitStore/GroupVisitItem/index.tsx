import styled from "styled-components";
import { VisitItem } from "../../../app/types";
import VisitEditorItem from "../VisitEditorItem";

export function GroupVisitItems(props: {
  items: VisitItem[];
  groupName: string;
}) {
  const groupName = props.groupName || "resident";
  return (
    <Wrap>
      <GroupLine key={"GroupLine_" + groupName}>
        <span>{groupName}</span>
      </GroupLine>
      {props.items.map((item: VisitItem) => (
        <VisitEditorItem key={item.cid} item={item} />
      ))}
    </Wrap>
  );
}

const Wrap = styled.div`
  --navColor: #4c4a46;
  --btnHoverColor: rgb(25, 133, 161);
  --btnHoverBgColor: rgba(25, 133, 161, 0.5);
  --toogleColor: #fff;
  --bkgColor: #fff;

  background-color: aquamarine;
`;
const GroupLine = styled.h1`
  margin: 20px 0 10px 0;
  position: relative;
  text-align: center;
  font-size: 22px;
  letter-spacing: 2px;
  text-transform: uppercase;
  z-index: 1;
  ::before {
    content: "";
    display: block;
    width: 50%;
    height: 2px;
    background-color: var(--btnHoverColor);
    position: absolute;
    left: 0;
    top: 50%;
    z-index: -1;
  }
  ::after {
    content: "";
    display: block;
    width: 50%;
    height: 2px;
    background-color: var(--btnHoverColor);
    position: absolute;
    right: 0;
    top: 50%;
    z-index: -1;
  }
  span {
    padding: 0 10px;
    color: var(--btnHoverColor);
    background-color: var(--bkgColor);
    border-radius: 5px;
  }
`;

import styled from "styled-components";
import { ChannelCardProps } from "../../app/types";
import { ChannelCard } from "./ChannelCard";
import GroupLine from "../../components/GroupLine";

export function ChannelCardsGroup(props: {
  cards: ChannelCardProps[];
  groupName: string;
}) {
  const { cards, groupName } = props;

  return (
    <>
      <GroupLine
        groupName={groupName}
        fontsize={"40px"}
        lineColor={"rgb(25, 133, 161)"}
        bkgColor={"#fff"}
      />
      <ChannelGridCantainer key={"ChannelGridCantainer_" + groupName}>
        {cards.map((ch: ChannelCardProps) => (
          <ChannelCard
            key={`ChannelCard_${ch.cid}`}
            {...ch}
            group={groupName}
          />
        ))}
      </ChannelGridCantainer>
    </>
  );
}

const ChannelGridCantainer = styled.div`
  --navColor: #4c4a46;
  --btnHoverColor: rgb(25, 133, 161);
  --btnHoverBgColor: rgba(25, 133, 161, 0.5);
  --toogleColor: #fff;
  --bkgColor: #fff;


  display: grid;
  grid-gap: 4px;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  justify-content: center;
  align-items: center;

  @media (max-width: 360px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

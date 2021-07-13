import { useSelector } from "../../../app/hooks";
import ChannelCard from "../../theater/ChannelCard";
import { ChannelProps } from "../../../app/types";
import styled from "styled-components";
import { Fragment } from "react";
import { selectChannelStore } from "../slice";
import { getApprovedGroupName } from "../../../app/share";

export function FavoredChannels() {
  const { group, tags, view, favored } = useSelector(selectChannelStore);
  console.log("group: ", { group });
  console.log("tags: ", { tags });
  console.log("view: ", { view });
  console.log("favored: ", { favored });

  return (
    <>
      {view.map((channels, i) => {
        const groupName = getApprovedGroupName(group[i]);

        return channels !== null ? (
          <GroupChannels
            key={"GroupChannels_" + groupName}
            channels={channels}
            groupName={groupName}
          />
        ) : (
          <Fragment key={"Fragment_" + groupName} />
        );
      })}
    </>
  );
}

function GroupChannels(props: { channels: ChannelProps[]; groupName: string }) {
  const { channels, groupName } = props;

  return (
    <>
      <GroupLine>
        <span>{groupName}</span>
      </GroupLine>
      <ChannelGridCantainer key={"ChannelGridCantainer_" + groupName}>
        {channels.map((ch: ChannelProps) => (
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
  @media (min-width: 360px) {
    display: grid;
    grid-gap: 4px;
    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
    justify-content: center;
    align-items: center;
  }
`;

const GroupLine = styled.h1`
  --navColor: #4c4a46;
  --btnHoverColor: rgb(25, 133, 161);
  --btnHoverBgColor: rgba(25, 133, 161, 0.5);
  --toogleColor: #fff;
  --bkgColor: #fff;

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

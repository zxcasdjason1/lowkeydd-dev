import styled from "styled-components";
import { AiOutlineBook } from "react-icons/ai";
import { useSelector } from "../../../app/hooks";
import { NavItem } from "../../../components/NavItem";
import { selectFavoredChannels } from "../slice";

type Props = {
  showMenu: () => void;
};

export function CollectionNavItem(props: Props) {
  const favored = useSelector(selectFavoredChannels);
  const numOfFavoredChannels = favored.length;
  const isVisible = favored.length > 0;

  return (
    <Collection visible={isVisible}>
      <NavItem
        key={`MenuItem_收藏`}
        title="收藏"
        path="/channels/visit"
        icon={<AiOutlineBook />}
        showMenu={props.showMenu}
      />
      <h1>
        <span>{numOfFavoredChannels}</span>
      </h1>
    </Collection>
  );
}

const Collection = styled.div<{ visible: boolean }>`
  --display: ${(props) => [props.visible ? `block` : `none`]};

  display: flex;
  h1 {
    text-align: center;
    line-height: 18px;
    display: var(--display);
    position: absolute;
    color: #fff;
    z-index: 2;
    top: 22px;
    right: 95px;
    font-size: 12px;
  }
  span {
    display: var(--display);
    content: "";
    transform: translate(-50%, -50%);
    top: -1px;
    left: 0px;
    width: 16px;
    height: 16px;
    position: absolute;
    color: white;
    background-color: red;
    border-radius: 50%;
    z-index: -1;
  }
  @media screen and (max-width: 768px) and (min-width: 480px) {
    h1 {
      line-height: 18px;
      top: 19px;
      right: 24px;
      font-size: 14px;
    }
    span {
      top: 0px;
      left: 0px;
      width: 18px;
      height: 18px;
    }
  }
  @media screen and (max-width: 480px) {
    div {
      width: 80%;
      p {
        margin: 0px;
      }
    }
    h1 {
      line-height: 16px;
      top: 327px;
      left: 102px;
      font-size: 12px;
    }
    span {
      top: 0px;
      left: 0px;
      width: 16px;
      height: 16px;
    }
  }
`;

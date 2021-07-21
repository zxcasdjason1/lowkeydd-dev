import styled from "styled-components";
import { useDispatch } from "../../../app/hooks";
import { IframeProps } from "../../../app/types";
import { appendIframeToPlaylist, removeIframeFromPlaylist } from "../slice";

type TheaterSliderItemProps = {
  item: IframeProps;
  index: number;
  isStopTrans: boolean;
};

export function TheaterSliderItem(props: TheaterSliderItemProps) {
  const { index, isStopTrans, item } = props;
  const { preview, cname, avatar, checked } = item;
  const dispatch = useDispatch();

  const handleClick = () => {
    if (item.checked) {
      dispatch(removeIframeFromPlaylist({ item }));
    } else {
      dispatch(appendIframeToPlaylist({ item }));
    }
  };
  // console.log("[TheaterSliderItem] render")
  return (
    <Section index={index} isStopTrans={isStopTrans}>
      <SliderPreview>
        <img src={preview} alt={`${cname}_preview`} />
        <p>{`${cname}`}</p>
      </SliderPreview>
      <Avatar
        src={avatar}
        alt={`${cname}_avatar`}
        onClick={handleClick}
        checked={checked}
      />
    </Section>
  );
}
const Section = styled.div<{ index: number; isStopTrans: boolean }>`
  position: relative;
  left: ${(props) => -100 * props.index}%;
  min-width: 100%;
  height: 100px;

  background-color: var(--navColor);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  transition: ${(props) => (props.isStopTrans ? `none` : `.5s`)};
`;

const SliderPreview = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  img {
    width: auto;
    height: auto;
    filter: blur(2px);
    opacity: 0.3;
  }

  p {
    position: absolute;
    top: 100px;
    padding: 4px;
    color: hotpink;
    background-color: var(--navColor);
    opacity: 0.8;
    text-align: center;
    font-size: 18px;
    transition: top 0.5s;
    z-index: 1;

    min-width: 100%;
    border-radius: 70% 70% 0 0;
  }

  :hover {
    p {
      top: 78px;
    }
  }
`;

const Avatar = styled.img<{ checked: boolean }>`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  width: 85px;
  border-radius: 50%;
  border: ${(props) => (props.checked ? `solid 5px hotpink` : `none`)};
  cursor: pointer;
  transition: width 0.2s ease-in-out;
  transition: border 0.5s;
  opacity: 0.9;

  :hover {
    width: 90px;
    opacity: 1;
  }
`;

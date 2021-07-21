import styled from "styled-components";
import SwitchBtn from "../../components/SwitchBtn";
import { SwitcherList } from "../../app/config";
import { useDispatch, useSelector } from "../../app/hooks";
import { selectUser } from "../user/slice";
import { selectTags } from "./slice";
import { reqFetchChannels } from "./api";

export function ChannelTagsSwitchers() {
  const { username, ssid } = useSelector(selectUser);
  const tags = useSelector(selectTags);
  const dispatch = useDispatch();
  console.log({ tags });

  const handleSwitchClick = (action: { tag: string; isChecked: boolean }) => {
    const { tag, isChecked } = action;
    if (isChecked) {
      if (!tags.includes(tag)) {
        dispatch(reqFetchChannels(username, ssid, [...tags, tag]));
      }
    } else {
      const newtags = tags.filter((_tag) => _tag !== tag);
      dispatch(reqFetchChannels(username, ssid, newtags));
    }
  };

  return (
    <>
      {SwitcherList.map((tag, _) => {
        const { htmlFor, afterColor } = tag;
        const checked = tags.indexOf(htmlFor) > -1;
        return (
          <SwitchBtnBox key={"SwitchBtnBox_" + htmlFor}>
            <p>{htmlFor}</p>
            <SwitchBtn
              htmlFor={htmlFor}
              checked={checked}
              theme={{ afterColor }}
              handleSwitchClick={handleSwitchClick}
            />
          </SwitchBtnBox>
        );
      })}
    </>
  );
}

const SwitchBtnBox = styled.div`
  margin: 0 0.5rem;
  height: 2.4rem;

  display: flex;
  align-items: center;
  flex-wrap: wrap;
  p {
    margin-right: 6px;
    font-size: 18px;
    text-transform: uppercase;
    color: #eee;
  }
`;

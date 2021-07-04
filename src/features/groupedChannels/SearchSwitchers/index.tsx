import styled from "styled-components";
import { useDispatch, useSelector } from "../../../app/hooks";
import SwitchBtn from "../../../components/SwitchBtn";
import { getLetsddV2Channels } from "../api";

export default function SearchSwitchers() {
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state.groupedChannels);
  const { username, ssid } = useSelector((state) => state.user);
  console.log({ tags });

  const handleSwitchClick = (action:{tag:string, isChecked:boolean})=>{
    const { tag, isChecked } = action;
    if (isChecked) {
      if (!tags.includes(tag)){
        dispatch(getLetsddV2Channels(username, ssid, [...tags, tag]));
      }
    } else {
      const newtags = tags.filter((_tag) => _tag !== tag);
      dispatch(getLetsddV2Channels(username, ssid, newtags));
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

type Switcher = {
  checked: boolean;
  htmlFor: string;
  afterColor: string;
};

const SwitcherList: Array<Switcher> = [
  { checked: false, htmlFor: "live", afterColor: "#f00" },
  { checked: false, htmlFor: "wait", afterColor: "#0ff" },
  { checked: false, htmlFor: "off", afterColor: "#856" },
];

const SwitchBtnBox = styled.div`
  margin: 0 1rem;
  height: 2.4rem;

  display: flex;
  align-items: center;
  flex-wrap: wrap;
  p {
    margin-right: 8px;
    font-size: 20px;
    text-transform: uppercase;
    color: #eee;
  }
`;

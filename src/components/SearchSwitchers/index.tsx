import styled from "styled-components";
import SwitchBtn from "../SwitchBtn";

export default function SearchSwitchers() {
  return (
    <>
      {SwitcherList.map((tag, _) => {
        const { htmlFor, checked, afterColor } = tag;
        return (
          <SwitchBtnBox key={"SwitchBtnBox_" + htmlFor}>
            <p>{htmlFor}</p>
            <SwitchBtn
              htmlFor={htmlFor}
              checked={checked}
              theme={{ afterColor }}
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

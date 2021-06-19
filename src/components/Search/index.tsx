import styled from "styled-components";
import SwitchBtn from "../SwitchBtn";
import SearchBox from "../SearchBox";

type SearchProps = {
  onSubmit: (inputValue: string) => void;
};

export default function Search(props: SearchProps) {
  return (
    <SearchContainer>
      <SearchBox
        onSubmit={props.onSubmit}
        theme={{ focusColor: "#1985a1", iconColor: "#c5c3c6" }}
      />

      {SearchTagList.map((tag, _) => {
        const { htmlFor, checked, afterColor } = tag;
        return (
          <SwitchBtnBox key={"SwitchBtnBox_"+htmlFor}>
            <p>{htmlFor}</p>
            <SwitchBtn
              htmlFor={htmlFor}
              checked={checked}
              theme={{ afterColor }}
            />
          </SwitchBtnBox>
        );
      })}
    </SearchContainer>
  );
}

type SearchTag = {
  checked: boolean;
  htmlFor: string;
  afterColor: string;
};

const SearchContainer = styled.div`
  width: 100%;
  margin: 0 0 2rem;
  padding: 5px 5px;
  background-color: #666;

  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-content: center;
  align-items: center;
`;

const SearchTagList: Array<SearchTag> = [
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

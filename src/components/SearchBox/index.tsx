import { useRef, useState } from "react";
import * as ai from "react-icons/ai";
import styled from "styled-components";

export default function SearchBox(props: SearchBoxProps) {
  // 取得樣式設定參數
  const { theme } = props;
  const [isEnable, setIsEnable] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);

  // 輸入查詢功能
  const handleKeyUp = (e: any) => {
    if (e.keyCode !== 13) {
      return;
    }

    // 按下enter鍵，提交數據
    commit();
  };

  const commit = () => {
    if (searchInput.current != null) {
      props.onSubmit(searchInput.current.value);
    } else {
      console.error("searchInput 不存在");
    }
  };

  const onChange = () => {
    if (searchInput.current && searchInput.current.value !== "") {
      setIsEnable(true);
    } else {
      setIsEnable(false);
    }
  };

  return (
    <Container {...theme} isEnable={isEnable}>
      <input
        onChange={onChange}
        onKeyUp={handleKeyUp}
        type="text"
        name=""
        id=""
        placeholder="(๑•̀ㅂ•́)و✧ 輸入喜歡的頻道網址 !!! "
        ref={searchInput}
      />
      <button onClick={commit}>
        <ai.AiOutlineSearch style={{ fontSize: "1.5rem" }} />
      </button>
    </Container>
  );
}

type SearchBoxProps = {
  theme?: SearchBoxThemeProps;
  onSubmit: (inputValue: string) => void;
};

type SearchBoxThemeProps = {
  iconColor?: string;
  focusColor?: string;
};

export const Container = styled.div<{
  iconColor?: string;
  focusColor?: string;
  isEnable: boolean;
}>`
  --height: 2.4rem;
  --width: 2.4rem;
  --bgColor: #2f3640;
  --iconColor: ${(props) => props.iconColor || "#e84118"};
  --focusColor: ${(props) => props.focusColor || "#fff"};
  background: var(--bgColor);
  width: ${(p) => (p.isEnable ? `100%` : `var(--width)`)};
  height: var(--height);
  border-radius: var(--height);
  padding: calc(var(--height) / 4);
  transition: width 0.4s;

  input {
    border: none;
    background: none;
    outline: none;
    float: left;
    color: #fff;
    font-size: 16px;
    line-height: var(--height);
    border-radius: var(--height);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.25);
    padding: ${(p) => (p.isEnable ? `0 1rem` : `0px`)};
    width: ${(p) => (p.isEnable ? `80%` : `0%`)};
    transition: all 0.4s;
  }

  button {
    color: var(--iconColor);
    float: right;
    width: var(--width);
    height: var(--height);
    border-radius: 50%;
    background-color: ${(p) =>
    p.isEnable ? `var(--focusColor)` : `var(--bgColor)`};
    display: flex;
    justify-content: center;
    align-items: center;
    :hover{

    }
  }

  :focus-within {
    width: 100%;
    input {
      padding: 0 1rem;
      width: 80%;
    }
    button {
      background-color: var(--focusColor);
    }
  }

  :hover {
    width: 100%;
    input {
      padding: 0 1rem;
      width: 80%;
    }
    button {
      background-color: var(--focusColor);
    }
  }
`;

// const SearchInput = styled.input`
//     border: none;
//     background: none;
//     outline: none;
//     float: left;
//     color: #fff;
//     font-size: 16px;
//     line-height: var(--height);
//     border-radius: var(--height);
//     box-shadow: 0 0 10px rgba(255, 255, 255, 0.25);
//     padding: 0px;
//     width: 0%;
//     transition: all 0.4s;
// `;

// const SearchButton = styled.a`
//   color: var(--iconColor);
//   float: right;
//   width: var(--width);
//   height: var(--height);
//   border-radius: 50%;
//   background-color: var(--bgColor);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

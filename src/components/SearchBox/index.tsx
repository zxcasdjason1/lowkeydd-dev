import { useRef, useState } from "react";
import { Container, SearchInput, SearchButton } from "./styles";
import * as ai from "react-icons/ai";

export default function SearchBox(props: SearchBoxProps) {
  // 取得樣式設定參數
  const { theme } = props;

  // 管理畫面效果
  const [isHover, setIsHover] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);
  let _isFocus = false;

  // 僅用於pc,移入時展開
  const handleOver = () => {
    setIsHover(true);
  };

  // 僅用於pc,直到blur才會縮回去
  const handleOut = () => {
    if (_isFocus === false) {
      setIsHover(false);
    }
  };

  // blur縮回去
  const handleBlur = () => {
    _isFocus = false;
    setIsHover(false);
  };

  const handleClick = () => {
    // 管理畫面UI效果；主要支援手機(無over和out)，點去按鈕展開並focus
    _isFocus = true;
    setIsHover(true);
    searchInput.current?.focus();
  };

  // 輸入查詢功能
  const handleKeyUp = (e: any) => {
    if (e.keyCode !== 13) {
      return;
    }

    // 按下enter鍵，提交數據
    commit();
  };

  const commit = () => {
    const value = searchInput.current?.value + "";
    if (value !== "") {
      props.onSubmit(value);
    }
  };

  return (
    <Container
      onMouseOver={handleOver}
      onMouseOut={handleOut}
      onClick={handleClick}
      isHover={isHover}
      {...theme}
    >
      <SearchInput
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
        type="text"
        name=""
        id=""
        placeholder="請輸入一些關鍵字來獲取喜歡的頻道吧 (´▽`ʃ❤ƪ)"
        isHover={isHover}
        ref={searchInput}
      />
      <SearchButton isHover={isHover}>
        <ai.AiOutlineSearch style={{ fontSize: "1.5rem" }} />
      </SearchButton>
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

// const Container = styled.div<{
//   isHover: boolean;
//   iconColor?: string;
//   focusColor?: string;
// }>`
//   --height: 2.4rem;
//   --width: 2.4rem;
//   --bgColor: #2f3640;
//   --iconColor: ${(props) => props.iconColor || "#e84118"};
//   --focusColor: ${(props) => props.focusColor || "#fff"};
//   background: var(--bgColor);
//   height: var(--height);
//   border-radius: var(--height);
//   padding: calc(var(--height) / 4);
//   width: ${(props) => (props.isHover ? `100%` : `var(--width)`)};
//   transition: width 0.4s;
// `;

// const SearchButton = styled.a<{ isHover: boolean }>`
//   color: var(--iconColor);
//   float: right;
//   width: var(--width);
//   height: var(--height);
//   border-radius: 50%;
//   background-color: ${(props) =>
//     props.isHover ? `var(--focusColor)` : `var(--bgColor)`};
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const SearchInput = styled.input<{ isHover: boolean }>`
//   border: none;
//   background: none;
//   outline: none;
//   float: left;
//   color: #fff;
//   font-size: 16px;
//   line-height: var(--height);
//   border-radius: var(--height);
//   box-shadow: 0 0 10px rgba(255, 255, 255, 0.25);
//   padding: ${(props) => (props.isHover ? `0 1rem` : `0px`)};
//   width: ${(props) => (props.isHover ? `80%` : `0%`)};
//   transition: all 0.4s;
// `;

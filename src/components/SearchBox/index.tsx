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

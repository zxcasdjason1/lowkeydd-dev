import { useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "../../../app/hooks";
import { reqSearchChannel } from "../api";
import * as ai from "react-icons/ai";

export default function VisitEditorSearch() {
  const searchInput = useRef<HTMLInputElement>(null);
  const groupedVisitItems = useSelector((state) => state.groupedVisitItems);
  const dispatch = useDispatch();

  const handleClick = (e: any) => {
    commit();
  };
  const handleKeyUp = (e: any) => {
    if (e.keyCode !== 13) {
      return;
    }
    commit();
  };
  const commit = () => {
    if (searchInput.current != null) {
      if (!searchInput.current.value) {
        console.log("輸入不可為空，動作撤回");
        return;
      }
      dispatch(reqSearchChannel(searchInput.current.value, groupedVisitItems));
    } else {
      console.error("searchInput 不存在");
    }
  };
  return (
    <Container>
      <AddBtn onClick={handleClick}>
        <ai.AiOutlinePlusCircle />
      </AddBtn>
      <SearchInput
        type="text"
        id="new-todo-input"
        name="text"
        autoComplete="off"
        placeholder="Type to add"
        onKeyUp={handleKeyUp}
        ref={searchInput}
      />
    </Container>
  );
}

const Container = styled.div`
  --navColor: #4c4a46;
  --toogleColor: #1985a1;
  --btnHoverColor: #fff;
  --menuText: #c5c3c6;
  --btnShadowColor: #719ece;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: var(--navColor);
  
  width: auto;
  margin: auto;
  padding: 10px 5px 5px 0;
  border-radius: 0 0 15px 15px;
`;
const AddBtn = styled.div`
  cursor: pointer;
  margin: 0 5px;
  color: var(--toogleColor);
  font-size: 30px;
  background-color: none;
  margin: 0px 10px;
  :hover {
    color: var(--btnHoverColor);
    background-color: var(--toogleColor);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--btnShadowColor);
    transition: color 0.5s, background-color 0.5s shadow 0.5s;
  }
`;
const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  font-size: 18px;
  border-radius: 10px;
  padding: 0 5px 0 10px;
  cursor: pointer;
  outline-width: 0;
  background-color: var(--menuText);
  :hover {
    color: var(--toogleColor);
    border: solid 3px;
    border-color: var(--toogleColor);
  }
  :focus {
    color: var(--toogleColor);
    border: solid 3px;
    border-color: var(--toogleColor);
    box-shadow: 0 0 10px var(--btnShadowColor);
    background-color: #fff;
  }
`;

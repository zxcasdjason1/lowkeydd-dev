import { ReactElement, useEffect, useRef, useState } from "react";
import VisitEditorItem from "../VisitEditorItem";
import VisitEditorSearch from "../VisitEditorSearch";
import styled from "styled-components";
import { reqEditVisit, reqUpdateVisit } from "../api";
import { useDispatch, useSelector } from "../../../app/hooks";
import { GroupVisitItems } from "../GroupVisitItem";
import { Fragment } from "react";
import * as ai from "react-icons/ai";

export function VisitEditor() {
  const { username, ssid } = useSelector((state) => state.user);
  const groupedVisitItems = useSelector((state) => state.groupedVisitItems);
  const { view, group, current } = groupedVisitItems;
  const dispatch = useDispatch();
  const onUpdate = () => {
    console.log("onUpdate", { groupedVisitItems });
    dispatch(reqUpdateVisit(username, ssid, groupedVisitItems));
  };
  
  useEffect(() => {
    dispatch(reqEditVisit(username, ssid));
    
    return () => {
      // componentWillUnmount
    };
  }, []);
  
  console.log("view: ", { view });
  console.log("group: ", [group]);

  // 測試圖片
  // "https://picsum.photos/300/150"

  return (
    <Wrap>
      <Container>
        <RefreshBtn>
          <ai.AiOutlineHistory />
        </RefreshBtn>
        <SaveBtn onClick={onUpdate}>
          <ai.AiOutlineDeliveredProcedure />
        </SaveBtn>
        <Preview>
          {GetImg(current)}
        </Preview>
        <VisitEditorSearch />
        {view.map((items, i) =>
          items.length > 0 ? (
            <GroupVisitItems
              key={"GroupVisitItems_" + group[i]}
              items={items}
              groupName={group[i]}
            />
          ) : (
            <Fragment />
          )
        )}
      </Container>
    </Wrap>
  );
}

const GetImg = (current: any): ReactElement=>
  current === null ? (
    <div>
      <ai.AiOutlineFundView />
      <p>一緒にddしましょう o(*￣▽￣*)ブ</p>
    </div>
  ) : current.thumbnail == "" ? (
    <div>
      <ai.AiFillFrown />
      <p>獲取頻道訊息發生錯誤</p>
    </div>
  ) : (
    <img src={current.thumbnail} alt="" />
  );

const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: none;
`;

const Container = styled.div`
  --navColor: #4c4a46;
  --btnHoverColor: rgb(25, 133, 161);
  --btnHoverBgColor: rgba(25, 133, 161, 0.5);
  --toogleColor: #fff;
  --bkgColor: #999;

  position: relative;
  margin: 0 auto;
  top: 56px;

  transform: translateY(0%);

  box-sizing: border-box;
  border: 5px solid;
  border-radius: 0 0 1.5em 1.5em;
  border-color: var(--navColor);
  background-color: var(--bkgColor);

  max-width: 480px;
  min-width: 250px;
`;

const RefreshBtn = styled.div`
  position: absolute;
  right: 10px;
  top: 1rem;

  color: var(--btnHoverColor);
  background: none;
  padding: 0.5rem;

  font-size: 2.5rem;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0px 15px 10px -15px #000;
  :hover {
    color: var(--toogleColor);
    background-color: var(--btnHoverBgColor);
  }
`;

const SaveBtn = styled.div`
  position: absolute;
  right: 10px;
  top: 5rem;

  color: var(--btnHoverColor);
  background: none;
  padding: 0.5rem;

  font-size: 2.5rem;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0px 15px 10px -15px #000;
  :hover {
    color: var(--toogleColor);
    background-color: var(--btnHoverBgColor);
  }
`;

const Preview = styled.div`
  margin: auto;
  /* border-radius: 0px 0px 15px 15px; */
  background-color: var(--navColor);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  img {
    width: 99.9%;
    max-width: 480px;
    border-radius: 0px 0px 15px 15px;
  }

  div {
    width: 100%;
    padding: 40px 0;
    background-color: var(--bkgColor);
    color: var(--navColor);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 0px 0px 15px 15px;

    svg {
      font-size: 150px;
    }

    p{
      font-size: 20px;
    }
  }
`;

const GroupLine = styled.h1`
  margin: 10px 0 10px 0;
  position: relative;
  text-align: center;
  font-size: 20px;
  letter-spacing: 2px;
  z-index: 1;
  ::before {
    content: "";
    display: block;
    width: 50%;
    height: 2px;
    background-color: var(--btnHoverColor);
    position: absolute;
    left: 0;
    top: 50%;
    z-index: -1;
  }
  ::after {
    content: "";
    display: block;
    width: 50%;
    height: 2px;
    background-color: var(--btnHoverColor);
    position: absolute;
    right: 0;
    top: 50%;
    z-index: -1;
  }
  span {
    padding: 0 10px;
    color: var(--btnHoverColor);
    background-color: var(--bkgColor);
    border-radius: 5px;
  }
`;

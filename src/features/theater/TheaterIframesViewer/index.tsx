import styled from "styled-components";
import { useDispatch, useSelector } from "../../../app/hooks";
import {
  selectPlayPairs,
  selectGridLayout,
  resizeGridLayout,
} from "../slice";
import { useRef, useLayoutEffect, useCallback } from "react";
import { TheaterPlayerItem } from "../TheaterPlayerItem";

export function TheaterIframesViewer() {
  const dom = useRef<HTMLDivElement>(null);
  const pairs = useSelector(selectPlayPairs);
  const numOfIframes = pairs.length;
  const { col, row, flexType } = useSelector(selectGridLayout);
  const dispatch = useDispatch();

  const resizeIframes = useCallback(() => {
    if (numOfIframes === 0 || dom.current === null) {
      return;
    }
    console.log("[TheaterIframesViewer] Resize All Iframes");
    const { clientWidth, clientHeight } = dom.current;
    dispatch(resizeGridLayout({ clientWidth, clientHeight }));
  }, [dispatch, dom, numOfIframes]);

  useLayoutEffect(() => {
    // 添加新的Iframe元素時，要先執行一次
    resizeIframes();

    // 監聽畫面更新時的resize
    let handler: any = null;
    const resize = () => {
      if (handler) {
        clearTimeout(handler);
      }
      handler = setTimeout(resizeIframes, 500);
    };
    window.addEventListener("resize", resize);

    return () => {
      if (handler) {
        clearTimeout(handler);
      }
      window.removeEventListener("resize", resize);
    };
  }, [resizeIframes]);

  // console.log(`[TheaterIframesViewer] render, numOfIframes: ${numOfIframes}`);
  return (
    <Container ref={dom} col={col} row={row}>
      {pairs.map(({ player, chatbox }) => (
        <TheaterPlayerItem
        key={"TheaterPlayerItem_" + player.cid}
          flexType={flexType}
          player={player}
          chatbox={chatbox}
        />
      ))}
    </Container>
  );
}

const Container = styled.div<{ col: number; row: number }>`
  position: absolute;
  left: 0;
  top: 100px;
  width: 100%;
  height: calc(100% - 100px);
  box-sizing: border-box;
  background: linear-gradient(120deg, #4c4a46, #c5c3c6);
  z-index: 1;

  display: grid;
  grid-template-columns: repeat(${(props) => props.col}, 1fr);
  grid-template-rows: repeat(${(props) => props.row}, 1fr);
`;

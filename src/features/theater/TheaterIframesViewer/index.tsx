import styled from "styled-components";
import { useDispatch, useSelector } from "../../../app/hooks";
import {
  selectPlaylist,
  selectIframeSize,
  setIframeSize,
  selectIframeRatio,
} from "../slice";
import { useRef, useLayoutEffect, useCallback } from "react";
import { IframeProps } from "../../../app/types";
import { TheaterIframeItem } from "../TheaterIframeItem";

export function TheaterIframesViewer() {
  const dom = useRef<HTMLDivElement>(null);
  const playlist = useSelector(selectPlaylist);
  const numOfIframes = playlist.length;
  const iframeSize = useSelector(selectIframeSize);
  const iframeRatio = useSelector(selectIframeRatio);
  const dispatch = useDispatch();

  const resizeIframes = useCallback(() => {
    if (numOfIframes === 0 || dom.current === null) {
      return;
    }

    console.log("[TheaterIframesViewer] Resize All Iframes");
    console.log("[TheaterIframesViewer] numOfIframes: ", numOfIframes);

    const newIframeSize = calcNewIframeSize(
      dom.current.clientWidth,
      dom.current.clientHeight,
      iframeRatio,
      numOfIframes
    );

    dispatch(setIframeSize(newIframeSize));
  }, [dispatch, dom, iframeRatio, numOfIframes]);

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

  console.log(`[TheaterIframesViewer] render, numOfIframes: ${numOfIframes}`);
  return (
    <Container ref={dom} {...iframeSize}>
      {playlist.map((ifr: IframeProps) => (
        <TheaterIframeItem key={"TheaterIframeItem_" + ifr.cid} {...ifr} />
      ))}
    </Container>
  );
}

type IframeSizeProps = {
  col: number;
  row: number;
  w: number;
  h: number;
};

const Container = styled.div<IframeSizeProps>`
  --iframeWidth: ${(props) => props.w}px;
  --iframeHeight: ${(props) => props.h}px;

  position: absolute;
  left: 0;
  top: 100px;
  width: 100%;
  height: calc(100% - 100px);
  box-sizing: border-box;
  background-color: gray;
  z-index: 1;

  display: grid;
  grid-template-columns: repeat(${(props) => props.col}, 1fr);
  grid-template-rows: repeat(${(props) => props.row}, 1fr);
`;

const calcNewIframeSize = (
  cW: number,
  cH: number,
  ratio: number,
  size: number
): IframeSizeProps => {
  let maxArea = 0;
  let col = 0;
  let row = 0;
  let w = 0;
  let h = 0;

  for (let i = 1; i < size + 1; i++) {
    const curRow = Math.ceil(size / i);
    // 期待的均分寬度為  (cW / i) * Ratio ;
    // 實際允許寬度上限  cH / curRow) ;
    // 合理寬度範圍勢必介於 [期待的均分寬度為, 實際允許寬度上限] 這兩者之間
    let curH = Math.min((cW / i) * ratio, cH / curRow);
    // 寬度決定後，便可直接決定出高度。
    let curW = curH * (1 / ratio);

    const curArea = curW * curH;
    if (curArea > maxArea) {
      maxArea = curArea;
      col = i;
      row = curRow;
      w = curW;
      h = curH;
    }
    console.log(
      `[TheaterIframesViewer] \n col: ${i}, row: ${curRow}, w: ${curW}, h: ${curH}, area: ${curArea}, max: ${maxArea}`
    );
  }

  return { col, row, w, h };
};

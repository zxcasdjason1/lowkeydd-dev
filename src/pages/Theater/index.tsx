import { createRef, useRef } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";

type FrameSizeProps = {
  col: number;
  row: number;
  w: number;
  h: number;
};

const Ratio = 0.565;

export default function Theater() {
  const dom = useRef<HTMLDivElement>(null);
  const [elRefs, setElRefs] = useState([]);
  const [frameSize, setFrameSize] = useState<FrameSizeProps>({
    col: 0,
    row: 0,
    w: 0,
    h: 0,
  });
  const elements = [1, 2, 3, 4];
  const numOfElements = elements.length; //targetNum

  const initElRefs = () => {
    setElRefs((elRefs) =>
      Array(numOfElements)
        .fill(0)
        .map((_, i) => elRefs[i] || createRef())
    );
  };
  const resizePlayers = () => {
    if (dom.current === null) return;
    const len = numOfElements;
    const cW = dom.current.clientWidth;
    const cH = dom.current.clientHeight;

    let maxArea = 0;
    let col = 0;
    let row = 0;
    let w = 0;
    let h = 0;

    for (let i = 1; i < len + 1; i++) {
      const curRow = Math.ceil(len / i);
      // 期待的均分寬度為  (cW / i) * Ratio ;
      // 實際允許寬度上限  cH / curRow) ;
      // 故得出的寬度勢必介於 [期待的均分寬度為, 實際允許寬度上限] 這兩者之間
      let curH = Math.min((cW / i) * Ratio, cH / curRow);
      let curW = curH * (1 / Ratio);

      const curArea = curW * curH;
      if (curArea > maxArea) {
        maxArea = curArea;
        col = i;
        row = curRow;
        w = curW;
        h = curH;
      }
      // console.log(
      //   `col: ${i}, row: ${curRow}, w: ${curW}, h: ${curH}, area: ${curArea}, max: ${maxArea}`
      // );
    }
    setFrameSize({ col, row, w, h });
  };

  useEffect(() => {
    
    initElRefs();
    resizePlayers();

    let handler: any = null;
    const resize = () => {
      if (handler) {
        clearTimeout(handler);
      }
      handler = setTimeout(resizePlayers, 500);
    };
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [dom.current]);

  console.log({ frameSize });

  return (
    <Wrap>
      <Container {...frameSize} ref={dom}>
        {elements.map((e, i) => (
          <div>
            {/* <div></div>
            <img
            src="https://i.ytimg.com/vi/H-Gtd9zzeII/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE"
            alt=""
          /> */}
            <iframe
              src="https://www.youtube.com/embed/qwqwxQDkOm0"
              ref={elRefs[i]}
            ></iframe>
          </div>
        ))}
      </Container>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
`;

const Container = styled.div<{
  col: number;
  row: number;
  w: number;
  h: number;
}>`
  position: absolute;
  left: 0;
  top: 65px;
  width: 100%;
  height: calc(100% - 65px);
  box-sizing: border-box;
  background-color: gray;

  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); */
  /* grid-template-rows: repeat(auto-fill, minmax(201px, 1fr)); */

  grid-template-columns: repeat(${(props) => props.col}, 1fr);
  grid-template-rows: repeat(${(props) => props.row}, 1fr);

  div {
    /* position: relative;
    overflow: hidden; */

    display: flex;
    align-items: center;

    iframe {
      z-index: 1;
      width: ${(props) => props.w}px;
      height: ${(props) => props.h}px;

      /* width: 100%; */
      /* height: 56.5%; */
    }
  }
`;

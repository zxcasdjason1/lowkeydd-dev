import { ChatboxIframe, PlayerIframe, TheaterState } from "../../../app/types";

export const resizeGridLayout = (
  state: TheaterState,
  action: {
    type: string;
    payload: {
      clientWidth: number;
      clientHeight: number;
    };
  }
) => {
  const { clientWidth, clientHeight } = action.payload;
  const ratio = state.gridlayout.ratio;
  const numOfIframes = state.playlist.length;
  const { flexType, pw, ph, cw, ch, col, row } = calcNewIframeSizeV2(
    clientWidth,
    clientHeight,
    ratio,
    numOfIframes
  );
  const { w: noChatWidth, h: noChatHeight } = calcSingleIframeSize(
    clientWidth,
    clientHeight,
    row,
    col,
    ratio
  );

  let newPlayerList: PlayerIframe[] = [];
  let newChatboxList: ChatboxIframe[] = [];

  state.chatlist.forEach((chatbox, i) => {
    const player = state.playlist[i];
    if (chatbox.isEnable) {
      newPlayerList.push(setIframeSize(player, { w: pw, h: ph }));
      newChatboxList.push(setIframeSize(chatbox, { w: cw, h: ch }));
      // playerSize.push({ w: pw, h: ph });
      // chatboxSize.push({ w: cw, h: ch });
    } else {
      newPlayerList.push(
        setIframeSize(player, { w: noChatWidth, h: noChatHeight })
      );
      newChatboxList.push(setIframeSize(chatbox, { w: 0, h: 0 }));
      // playerSize.push({ w: noChatWidth, h: noChatHeight });
      // chatboxSize.push({ w: 0, h: 0 });
    }
  });

  state.playlist = newPlayerList;
  state.chatlist = newChatboxList;

  state.gridlayout = {
    flexType,
    ratio,
    clientWidth,
    clientHeight,
    col,
    row,
  };
};

const MIN_CHATBOX_WIDTH = 320;
const MIN_CHATBOX_HEIGHT = 320;

type IframeSizePropsV2 = {
  col: number;
  row: number;
  pw: number;
  ph: number;
  cw: number;
  ch: number;
  flexType: string;
};

const calcNewIframeSizeV2 = (
  cW: number,
  cH: number,
  ratio: number,
  size: number
): IframeSizePropsV2 => {
  let result: IframeSizePropsV2 = {
    col: 0,
    row: 0,
    cw: 0,
    ch: 0,
    pw: 0,
    ph: 0,
    flexType: "column",
  };

  let maxArea = 0;

  for (let i = 1; i < size + 1; i++) {
    const curRow = Math.ceil(size / i);

    const gridW = cW / i;
    const gridH = cH / curRow;
    var curPlayW = 0;
    var curPlayH = 0;
    var curChatW = 0;
    var curChatH = 0;

    // TYPE flex-direction: column
    if (gridH > MIN_CHATBOX_HEIGHT) {
      curChatW = gridW;
      curPlayH = Math.min(gridW * ratio, gridH - MIN_CHATBOX_HEIGHT);
      curPlayW = curPlayH * (1 / ratio);

      curChatH = gridH - curPlayH;

      let area = curPlayH * curPlayW;
      if (area > maxArea) {
        maxArea = area;
        result = getResult(
          i,
          curRow,
          curChatW,
          curChatH,
          curPlayW,
          curPlayH,
          "column"
        );
      }
      console.log(
        `[column] \n col: ${i}, row: ${curRow}, pw: ${curPlayW}, ph: ${curPlayH}, cw: ${curChatW}, ch: ${curChatH},  area: ${area}, max: ${maxArea}`
      );
    }

    // TYPE flex-direction: row
    if (gridW > MIN_CHATBOX_WIDTH) {
      curChatH = gridH;
      curPlayW = Math.min(gridH * (1 / ratio), gridW - MIN_CHATBOX_WIDTH);
      curPlayH = curPlayW * ratio;

      curChatW = gridW - curPlayW;

      let area = curPlayH * curPlayW;
      if (area > maxArea) {
        maxArea = area;
        result = getResult(
          i,
          curRow,
          curChatW,
          curChatH,
          curPlayW,
          curPlayH,
          "row"
        );
      }
      console.log(
        `[row] \n col: ${i}, row: ${curRow}, pw: ${curPlayW}, ph: ${curPlayH}, cw: ${curChatW}, ch: ${curChatH},  area: ${area}, max: ${maxArea}`
      );
    }

    // neither
    if (gridH <= MIN_CHATBOX_HEIGHT && gridW <= MIN_CHATBOX_WIDTH) {
      curPlayH = Math.min(gridW * ratio, gridH);
      curPlayW = curPlayH * (1 / ratio);
      curChatW = 0;
      curChatH = 0;

      let area = curPlayH * curPlayW;
      if (area > maxArea) {
        maxArea = area;
        result = getResult(
          i,
          curRow,
          curChatW,
          curChatH,
          curPlayW,
          curPlayH,
          "column"
        );
      }
      console.log(
        `[column] \n col: ${i}, row: ${curRow}, pw: ${curPlayW}, ph: ${curPlayH}, cw: ${curChatW}, ch: ${curChatH},  area: ${area}, max: ${maxArea}`
      );
    }
  }

  return { ...result };
};

const setIframeSize = <T extends {}>(
  item: T,
  options: { ratio?: number; w: number; h: number }
): T => {
  const { ratio, w, h } = options;
  return {
    ...item,
    ratio: ratio || 0.5625,
    w,
    h,
  };
};

const getResult = (
  col: number,
  row: number,
  cw: number,
  ch: number,
  pw: number,
  ph: number,
  flexType: string
): IframeSizePropsV2 => {
  return {
    col,
    row,
    cw,
    ch,
    pw,
    ph,
    flexType,
  };
};

const calcSingleIframeSize = (
  cW: number,
  cH: number,
  curRow: number,
  curCol: number,
  ratio: number
): { w: number; h: number } => {
  const gridW = cW / curCol;
  const gridH = gridW * ratio;
  let h = Math.min(gridH, cH / curRow);
  let w = h * (1 / ratio);
  return { w, h };
};

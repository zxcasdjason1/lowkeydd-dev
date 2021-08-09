import { ConnectionConfig } from "../../app/share";
import {
  ChannelProps,
  ChatboxIframe,
  IframeProps,
  IframeSizeProps,
  PlayerIframe,
  TheaterElement,
} from "../../app/types";
import { setSlider } from "./slice";

export const createTheaterElement = (
  ch: ChannelProps,
  options: { checked: boolean }
): TheaterElement => {
  const { cid, cname, avatar, streamurl, thumbnail, method } = ch;
  const { checked } = options;
  return {
    cid,
    cname,
    avatar,
    streamurl,
    preview: thumbnail,
    method,
    checked,
  };
};

const getPlayerSrc = (
  method: string,
  streamurl: string,
  cname: string
): string => {
  console.log("ConnectionConfig.HostName: ", ConnectionConfig.HostName);

  let src = "";
  switch (method) {
    case "youtube":
      let sub = streamurl.match(/https?:\/\/www.youtube.com\/watch\?v=(\S*)/);
      let vedioid = sub ? sub[1] : "";
      src = `//www.youtube.com/embed/${vedioid}?enablejsapi=1&origin=${ConnectionConfig.HostName}&widgetid=1`;
      break;
    case "twitch":
      src = `//player.twitch.tv?allowfullscreen=false&channel=${cname}&parent=${ConnectionConfig.HostName}&muted=false&autoplay=false`;
      break;
    default:
      console.error("缺少對應的處理方式: ", method);
      break;
  }
  return src;
};

const getChatboxSrc = (
  method: string,
  streamurl: string,
  cname: string
): string => {
  console.log("ConnectionConfig.HostName: ", ConnectionConfig.HostName);

  let src = "";
  switch (method) {
    case "youtube":
      let sub = streamurl.match(/https?:\/\/www.youtube.com\/watch\?v=(\S*)/);
      let vedioid = sub ? sub[1] : "";
      src = `//www.youtube.com/live_chat?v=${vedioid}&is_popout=1&embed_domain=${ConnectionConfig.HostName}&dark_theme=1`;
      break;
    case "twitch":
      src = `//www.twitch.tv/embed/${cname}/chat?darkpopout=&secret=safe&parent=${ConnectionConfig.HostName}`;
      break;
    default:
      console.error("缺少對應的處理方式: ", method);
      break;
  }
  return src;
};

export const convertToPlayerIframe = (
  ch: ChannelProps,
  options: { ratio?: number; w: number; h: number }
): PlayerIframe => {
  const { cid, cname, avatar, thumbnail, method, streamurl } = ch;
  const { ratio, w, h } = options;

  return {
    cid,
    streamurl,
    src: getPlayerSrc(method, streamurl, cname),
    cname,
    avatar,
    preview: thumbnail,
    method,
    ratio: ratio || 0.5625,
    w,
    h,
  };
};

export const convertToChatboxIframe = (
  ch: ChannelProps,
  options: { ratio?: number; w: number; h: number; isEnable: boolean }
): ChatboxIframe => {
  const { cid, cname, avatar, thumbnail, method, streamurl } = ch;
  const { ratio, w, h, isEnable } = options;

  return {
    cid,
    streamurl,
    src: getChatboxSrc(method, streamurl, cname),
    cname,
    avatar,
    preview: thumbnail,
    method,
    ratio: ratio || 0.5625,
    w,
    h,
    isEnable,
  };
};

export const createPlayerIframe = (
  item: TheaterElement,
  options: { ratio?: number; w: number; h: number }
): PlayerIframe => {
  const { cid, cname, avatar, preview, method, streamurl } = item;
  const { ratio, w, h } = options;

  return {
    cid,
    streamurl,
    src: getPlayerSrc(method, streamurl, cname),
    cname,
    avatar,
    preview,
    method,
    ratio: ratio || 0.5625,
    w,
    h,
  };
};

export const createChatboxIframe = (
  item: TheaterElement,
  options: { ratio?: number; w: number; h: number; isEnable: boolean }
): ChatboxIframe => {
  const { cid, cname, avatar, preview, method, streamurl } = item;
  const { ratio, w, h, isEnable } = options;

  return {
    cid,
    streamurl,
    src: getChatboxSrc(method, streamurl, cname),
    cname,
    avatar,
    preview,
    method,
    ratio: ratio || 0.5625,
    w,
    h,
    isEnable,
  };
};

export const getListAppendIframe = <T extends IframeProps>(
  list: T[],
  newItem: T
): T[] => {
  const newlist = !list
    ? [newItem]
    : list.filter((o) => o.cid !== newItem.cid).concat(newItem);

  return newlist;
};

export const getListRemoveIframe = <T extends IframeProps>(
  list: T[],
  cid: string
): T[] => {
  const newlist = !list ? [] : list.filter((o) => o.cid !== cid);

  return newlist;
};

export const setIframeSize = <T extends {}>(
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

export const calcNewIframeSize = (
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
    // 期待的均分高度為  (cW / i) * Ratio ;
    // 實際允許高度上限  cH / curRow) ;
    // 合理高度範圍勢必介於 [期待的均分高度為, 實際允許高度上限] 這兩者之間
    const gridW = cW / i;
    const gridH = gridW * ratio;
    let curH = Math.min(gridH, cH / curRow);
    // 高度決定後，便可直接決定出寬度。
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

export const calcSingleIframeSize = (
  cW: number,
  cH: number,
  curRow: number,
  curCol: number,
  ratio: number,
): { w: number; h: number } => {
  const gridW = cW / curCol;
  const gridH = gridW * ratio;
  let h = Math.min(gridH, cH / curRow);
  let w = h * (1 / ratio);
  return { w, h };
};

type IframeSizePropsV2 = {
  col: number;
  row: number;
  pw: number;
  ph: number;
  cw: number;
  ch: number;
  flexType: string;
};

const MIN_CHATBOX_WIDTH = 320;
const MIN_CHATBOX_HEIGHT = 320;

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

export const calcNewIframeSizeV2 = (
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

export const playSliderLeft =
  (sliderIndex: number, numOfElements: number) => (dispatch: any) => {
    let next = sliderIndex - 1;
    if (next === 0) {
      dispatch(setSlider({ next: numOfElements + 1, isTakenOverAnim: true }));
      setTimeout(() => {
        dispatch(setSlider({ next: numOfElements, isTakenOverAnim: false }));
      });
    } else {
      dispatch(setSlider({ next, isTakenOverAnim: false }));
    }
  };

export const playSliderRight =
  (sliderIndex: number, numOfElements: number) => (dispatch: any) => {
    let next = sliderIndex + 1;
    if (next === numOfElements + 1) {
      dispatch(setSlider({ next: 0, isTakenOverAnim: true }));
      setTimeout(() => {
        dispatch(setSlider({ next: 1, isTakenOverAnim: false }));
      });
    } else {
      dispatch(setSlider({ next, isTakenOverAnim: false }));
    }
  };

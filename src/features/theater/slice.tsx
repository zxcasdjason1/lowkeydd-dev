import { createSelector, createSlice } from "@reduxjs/toolkit";
import { history } from "../..";
import { RootState } from "../../app/store";
import {
  ChannelCardProps,
  ChannelProps,
  ChatboxIframe,
  PlayerIframe,
  TheaterElement,
  TheaterState,
} from "../../app/types";
import {
  calcNewIframeSizeV2,
  convertToChatboxIframe,
  convertToPlayerIframe,
  createChatboxIframe,
  createPlayerIframe,
  createTheaterElement,
  getListAppendIframe,
  getListRemoveIframe,
  setIframeSize,
} from "./share";

const initialState: TheaterState = {
  fromChannel: [],
  elements: [],
  playlist: [],
  chatlist: [],
  slider: {
    sliderIndex: 0,
    isTakenOverAnim: false,
    isFolded: false,
  },
  gridlayout: {
    flexType: "column",
    ratio: 0.5625,
    clientWidth: 0,
    clientHeight: 0,
    col: 0,
    row: 0,
  },
};

const slice = createSlice({
  name: "theater",
  initialState,
  reducers: {
    setElements: (
      state,
      action: {
        type: string;
        payload: { channels: ChannelProps[] };
      }
    ) => {
      const { channels } = action.payload;
      if (channels.length === 0) {
        state.elements = [];
        state.slider.sliderIndex = 0;
      }
      const mp = new Map<string, boolean>();
      state.playlist.forEach((p) => mp.set(p.cid, true));

      // 進入Theater頁面後，會先獲取當前可以"直播"的頻道元素。
      // 進入Theater頁面方式有兩種:
      //    1) 透過NAV按鈕直接進入。
      //    2) 透過點擊卡片進入，這種方式會自動播放卡片上的影片。
      // 此處，檢查是否為(2)的方式，即檢查fromChannel，並再檢查後清除。
      var found = 0;
      const cidFromChannel: string = state.fromChannel[0].cid || "";

      // 透過playlist中的元素，對應elements進行修改
      const elements: TheaterElement[] = channels.map((ch, i) => {
        if (ch.cid === cidFromChannel) {
          found = i;
          console.log("由FromChannel存在，NEW_sliderIndex: ", found);
        }

        // 逐一獲取成 TheaterElement
        if (mp.get(ch.cid)) {
          return createTheaterElement(ch, { checked: true });
        } else {
          return createTheaterElement(ch, { checked: false });
        }
      });

      // 獲取新的 elements後，還要指定起始位置
      state.elements = elements;
      state.slider.sliderIndex = found + 1;
    },
    setSlider: (
      state,
      action: {
        type: string;
        payload: { next: number; isTakenOverAnim: boolean };
      }
    ) => {
      const { next, isTakenOverAnim } = action.payload;
      console.log(
        `[setSlider] next:${next} , isTakenOverAnim:${isTakenOverAnim}`
      );
      state.slider.sliderIndex = next;
      state.slider.isTakenOverAnim = isTakenOverAnim;
    },
    setSliderFolded: (
      state,
      action: {
        type: string;
        payload: boolean;
      }
    ) => {
      state.slider.isFolded = action.payload;
      console.log(`slider isFolded : ${action.payload}`);
    },
    resizeGridLayout: (
      state,
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
      const newIframeSize = calcNewIframeSizeV2(
        clientWidth,
        clientHeight,
        ratio,
        numOfIframes
      );
      const { flexType, pw, ph, cw, ch, col, row } = newIframeSize;
      state.playlist = state.playlist.map((player) =>
        setIframeSize(player, { w: pw, h: ph })
      );
      state.chatlist = state.chatlist.map((chatbox) =>
        setIframeSize(chatbox, { w: cw, h: ch })
      );
      state.gridlayout = {
        flexType,
        ratio,
        clientWidth,
        clientHeight,
        col,
        row,
      };
    },
    setFromChannel: (
      state,
      action: {
        type: string;
        payload: { item: ChannelCardProps };
      }
    ) => {
      const { item } = action.payload;
      const newPlayerIframe = convertToPlayerIframe(item, {
        w: 0,
        h: 0,
      });
      const newChatboxIframe = convertToChatboxIframe(item, {
        w: 0,
        h: 0,
        isEnable: item.status === "live",
      });
      state.fromChannel = [item];
      state.playlist = [newPlayerIframe];
      state.chatlist = [newChatboxIframe];
      history.push({ pathname: "/theater" });
    },
    appendIframeToPlaylist: (
      state,
      action: {
        type: string;
        payload: { item: TheaterElement };
      }
    ) => {
      const { item } = action.payload;
      const newItem: TheaterElement = { ...item, checked: true };
      const newElements: TheaterElement[] = state.elements.map((e) =>
        e.cid === item.cid ? newItem : e
      );

      const newPlaylist: PlayerIframe[] = getListAppendIframe(
        state.playlist,
        createPlayerIframe(newItem, { w: 0, h: 0 })
      );

      const newChatlist: ChatboxIframe[] = getListAppendIframe(
        state.chatlist,
        createChatboxIframe(newItem, { w: 0, h: 0, isEnable: true })
      );

      state.elements = newElements;
      state.playlist = newPlaylist;
      state.chatlist = newChatlist;
    },
    removeIframeFromPlaylist: (
      state,
      action: {
        type: string;
        payload: { item: TheaterElement };
      }
    ) => {
      const { item } = action.payload;
      const newItem: TheaterElement = { ...item, checked: false };
      const newElements: TheaterElement[] = state.elements.map((e) =>
        e.cid === item.cid ? newItem : e
      );
      state.elements = newElements;
      state.playlist = getListRemoveIframe(state.playlist, item.cid);
      state.chatlist = getListRemoveIframe(state.chatlist, item.cid);
    },
    removeIframeByCid: (
      state,
      action: {
        type: string;
        payload: { cid: string };
      }
    ) => {
      const { cid } = action.payload;
      state.playlist = getListRemoveIframe(state.playlist, cid);
      state.chatlist = getListRemoveIframe(state.chatlist, cid);
    },
  },
});

export const {
  setElements,
  setSlider,
  setSliderFolded,
  resizeGridLayout,
  setFromChannel,
  appendIframeToPlaylist,
  removeIframeFromPlaylist,
  removeIframeByCid,
} = slice.actions;
export default slice.reducer;

export const selectTheater = (state: RootState): TheaterState => state.theater;
export const selectElements = createSelector(
  [selectTheater],
  (theater) => theater.elements
);
export const selectPlaylist = createSelector(
  [selectTheater],
  (theater) => theater.playlist
);
export const selectPlayPairs = createSelector([selectTheater], (theater) => {
  const playlist = theater.playlist;
  const chatlist = theater.chatlist;
  const len = playlist.length;
  const result = [];
  for (let i = 0; i < len; i++) {
    result.push({ player: playlist[i], chatbox: chatlist[i] });
  }
  return result;
});
export const selectGridLayout = createSelector(
  [selectTheater],
  (theater) => theater.gridlayout
);
export const selectSlider = createSelector(
  [selectTheater],
  (theater) => theater.slider
);
export const selectNumOfElements = createSelector(
  [selectElements],
  (elements) => elements.length
);
export const selectSliderElements = createSelector(
  [selectElements],
  (elements) =>
    elements.length > 0
      ? [elements[elements.length - 1], ...elements, elements[0]]
      : []
);

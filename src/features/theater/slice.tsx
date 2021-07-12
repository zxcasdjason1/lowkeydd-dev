import { createSelector, createSlice } from "@reduxjs/toolkit";
import { history } from "../..";
import { RootState } from "../../app/store";
import { IframeProps, IframeSizeProps, TheaterState } from "../../app/types";

const initialState: TheaterState = {
  elements: [],
  playlist: [],
  slider: {
    sliderIndex: 1,
    isTakenOverAnim: false,
    isFolded: false,
  },
  iframes: {
    ratio: 0.565,
    size: {
      col: 0,
      row: 0,
      w: 0,
      h: 0,
    },
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
        payload: { elements: IframeProps[]; sliderIndex: number };
      }
    ) => {
      // 獲取新的 elements後，還要指定起始位置
      state.elements = action.payload.elements;
      state.slider.sliderIndex = action.payload.sliderIndex;
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
        payload:boolean;
      }
    ) => {
      state.slider.isFolded = action.payload;
      console.log(`slider isFolded : ${action.payload}`);
    },
    setTheater: (
      state,
      action: {
        type: string;
        payload: { playlist: IframeProps[]; elements: IframeProps[] };
      }
    ) => {
      state.playlist = action.payload.playlist;
      state.elements = action.payload.elements;
    },
    setIframeSize: (
      state,
      action: { type: string; payload: IframeSizeProps }
    ) => {
      state.iframes.size = action.payload;
    },
    setFromChannel: (
      state,
      action: {
        type: string;
        payload: { item: IframeProps };
      }
    ) => {
      const { item } = action.payload;
      state.playlist = [item];
      history.push({ pathname: "/theater" });
    },
  },
});

export const {
  setElements,
  setSlider,
  setSliderFolded,
  setTheater,
  setIframeSize,
  setFromChannel,
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
export const selectPlaylistMap = createSelector([selectTheater], (theater) => {
  let mp = new Map<string, IframeProps>();
  theater.playlist.forEach((p) => {
    mp.set(p.cid, p);
  });
  return mp;
});
export const selectIframes = createSelector(
  [selectTheater],
  (theater) => theater.iframes
);
export const selectSlider = createSelector(
  [selectTheater],
  (theater) => theater.slider
);
export const selectIframeSize = createSelector(
  [selectIframes],
  (theater) => theater.size
);
export const selectIframeRatio = createSelector(
  [selectIframes],
  (theater) => theater.ratio
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

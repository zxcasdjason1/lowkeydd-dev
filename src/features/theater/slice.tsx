import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { TheaterState } from "../../app/types";
import * as reducers from "./reducers";

const initialState: TheaterState = {
  fromChannel: [],
  elements: [],
  playlist: [],
  chatlist: [],
  slider: {
    sliderIndex: 0,
    isTakenOverAnim: false,
    isFolded: false,
    isFullScreen: false,
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
  reducers: reducers,
});

export const {
  setElements,
  setSlider,
  setSliderFolded,
  setFullScreen,
  setFromChannel,
  resizeGridLayout,
  appendIframeToPlaylist,
  removeIframeFromPlaylist,
  removeIframeByCid,
  switchChatBoxByCid,
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

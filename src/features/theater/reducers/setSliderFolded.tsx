import { TheaterState } from "../../../app/types";

export const setSliderFolded = (
    state:TheaterState,
    action: {
      type: string;
      payload: boolean;
    }
  ) => {
    // 主動觸發一次resize
    if (state.playlist.length > 0) {
      console.log("resize on after sliderFold");
      window.dispatchEvent(new Event("resize"));
    }

    state.slider.isFolded = action.payload;
    console.log(`slider isFolded : ${action.payload}`);
  }
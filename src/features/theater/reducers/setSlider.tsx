import { TheaterState } from "../../../app/types";

export const setSlider = (
    state:TheaterState,
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
  }
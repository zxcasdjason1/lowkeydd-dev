import { enableFullScreen, exitFullScreen } from "../shares/toggleFullScreen";
import { TheaterState } from "../../../app/types";

export const setFullScreen = (
    state:TheaterState,
    action: {
      type: string;
      payload: boolean;
    }
  ) => {
    if (action.payload) {
      enableFullScreen(document.body);
    } else {
      exitFullScreen();
    }
    state.slider.isFullScreen = action.payload;
    console.log(`slider isFullScreen : ${action.payload}`);
  }
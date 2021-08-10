import { setSlider } from "../slice";

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

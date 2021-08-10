import { TheaterState } from "../../../app/types";
import { getListRemoveIframe } from "../shares";

export const removeIframeByCid = (
    state:TheaterState,
    action: {
      type: string;
      payload: { cid: string };
    }
  ) => {
    const { cid } = action.payload;

    // 透過關閉元素的cid，找出對應在Slider上的元素，連同設置為關閉狀態。
    if (state.elements.length > 0) {
      state.elements = state.elements.map((e) =>
        e.cid === cid ? { ...e, checked: false } : e
      );
    }

    state.playlist = getListRemoveIframe(state.playlist, cid);
    state.chatlist = getListRemoveIframe(state.chatlist, cid);

    if (state.playlist.length > 0) {
      console.log("resize on after removeIframeByCid");
      window.dispatchEvent(new Event("resize"));
    }
  }
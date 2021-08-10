import { TheaterElement, TheaterState } from "../../../app/types";
import { getListRemoveIframe } from "../shares";

export const removeIframeFromPlaylist = (
    state:TheaterState,
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

    if (state.playlist.length > 0) {
      console.log("resize on after removeIframeFromPlaylist");
      window.dispatchEvent(new Event("resize"));
    }
  }
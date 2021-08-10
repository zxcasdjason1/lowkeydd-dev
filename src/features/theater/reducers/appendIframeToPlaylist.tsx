import { ChatboxIframe, PlayerIframe, TheaterElement, TheaterState } from "../../../app/types";
import { createChatboxIframe, createPlayerIframe, getListAppendIframe } from "../shares";

export const appendIframeToPlaylist =(
    state:TheaterState,
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

    if (state.playlist.length > 0) {
      console.log("resize on after appendIframeToPlaylist");
      window.dispatchEvent(new Event("resize"));
    }
  }
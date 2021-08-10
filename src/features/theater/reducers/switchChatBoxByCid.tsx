import { ChatboxIframe, TheaterState } from "../../../app/types";

export const switchChatBoxByCid = (
  state: TheaterState,
  action: {
    type: string;
    payload: { cid: string };
  }
) => {
  const { cid } = action.payload;

  // 透過關閉元素的cid，找出對應在Slider上的元素，連同設置為關閉狀態。
  state.chatlist = state.chatlist.map((c: ChatboxIframe) =>
    c.cid === cid ? { ...c, isEnable: !c.isEnable } : c
  );

  if (state.playlist.length > 0) {
    console.log("resize on after switchChatBoxByCid");
    window.dispatchEvent(new Event("resize"));
  }
};

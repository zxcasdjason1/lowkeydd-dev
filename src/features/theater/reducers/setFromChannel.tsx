import { history } from "../../..";
import { ChannelCardProps, TheaterState } from "../../../app/types";
import { convertToChatboxIframe, convertToPlayerIframe } from "../shares";


export const setFromChannel =(
    state:TheaterState,
    action: {
      type: string;
      payload: { item: ChannelCardProps };
    }
  ) => {
    const { item } = action.payload;
    const newPlayerIframe = convertToPlayerIframe(item, {
      w: 0,
      h: 0,
    });
    const newChatboxIframe = convertToChatboxIframe(item, {
      w: 0,
      h: 0,
      isEnable: item.status === "live",
    });
    state.fromChannel = [item];
    state.playlist = [newPlayerIframe];
    state.chatlist = [newChatboxIframe];
    history.push({ pathname: "/theater" });
  }
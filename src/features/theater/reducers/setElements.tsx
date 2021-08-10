import { ChannelProps, TheaterElement, TheaterState } from "../../../app/types";
import { createTheaterElement } from "../shares";


export const setElements = (
  state: TheaterState,
  action: {
    type: string;
    payload: { channels: ChannelProps[] };
  }
) => {
  const { channels } = action.payload;
  if (channels.length === 0) {
    state.elements = [];
    state.slider.sliderIndex = 0;
  }
  const mp = new Map<string, boolean>();
  state.playlist.forEach((p) => mp.set(p.cid, true));

  // 進入Theater頁面後，會先獲取當前可以"直播"的頻道元素。
  // 進入Theater頁面方式有兩種:
  //    1) 透過NAV按鈕直接進入。
  //    2) 透過點擊卡片進入，這種方式會自動播放卡片上的影片。
  // 此處，檢查是否為(2)的方式，即檢查fromChannel，並再檢查後清除。
  var found = 0;
  var cidFromChannel: string = "";
  if (state.fromChannel.length > 0) {
    cidFromChannel = state.fromChannel[0].cid;
  }

  // 透過playlist中的元素，對應elements進行修改
  const elements: TheaterElement[] = channels.map((ch, i) => {
    if (ch.cid === cidFromChannel) {
      found = i;
      console.log("由FromChannel存在，NEW_sliderIndex: ", found);
    }

    // 逐一獲取成 TheaterElement
    if (mp.get(ch.cid)) {
      return createTheaterElement(ch, { checked: true });
    } else {
      return createTheaterElement(ch, { checked: false });
    }
  });

  state.fromChannel = []; //每次都清空
  state.elements = elements;
  state.slider.sliderIndex = found + 1;
};

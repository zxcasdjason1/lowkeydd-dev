import axios from "axios";
import { setElements} from "./slice";
import { ChannelProps, IframeProps } from "../../app/types";
import { API_SERVER_URL } from "../../app/config";

export const reqTheaterChannels =
  (tag: string, playlist:IframeProps[]) => (dispatch: any) => {
    axios.get(`${API_SERVER_URL}/channels/${tag}`).then(
      (resp) => {
        console.log("Theater請求成功了, 回應如下:\n", resp.data);
        const code: string = resp.data["code"];
        const channels: ChannelProps[] = resp.data["channels"];
        if (code === "success") {

          let sliderIndex: number = 1;

          const mp = new Map<string, boolean>();
          playlist.forEach(x=>mp.set(x.cid, true));

          // 透過playlist中的元素，對應elements進行修改
          const elements: IframeProps[] = channels.map((ch, i) => {
            if (mp.get(ch.cid)) {
              sliderIndex = (i+1);
              return {
                ...createIframeProps_from_ChannelProps(ch),
                checked: true,
              };
            } else {
              return createIframeProps_from_ChannelProps(ch);
            }
            // playlistMap.get(ch.cid)
            //   ? {
            //       ...createIframeProps_from_ChannelProps(ch),
            //       checked: true,
            //     }
            //   : createIframeProps_from_ChannelProps(ch);
          });
          console.log("sliderIndex: ", elements, sliderIndex)
          dispatch(setElements({ elements, sliderIndex }));
        }
      },
      (err) => {
        console.log("Theater請求失敗了, 錯誤如下:\n", err);
      }
    );
  };

export const createIframeProps_from_ChannelProps = (
  ch: ChannelProps
): IframeProps => {
  const { cid, cname, avatar, thumbnail } = ch;
  let src = "";
  switch (ch.method) {
    case "youtube":
      let sub = ch.streamurl.match(
/https?:\/\/www.youtube.com\/watch\?v=(\S*)/
      );
      let channelid = sub ? sub[1] : "";
      src = `https://www.youtube.com/embed/${channelid}`;
      break;
    case "twitch":
      let channelName = ch.cname;
      src = `https://player.twitch.tv/?channel=${channelName}&parent=localhost&autoplay=false&muted=false`;
      break;
    default:
      console.error("缺少對應的處理方式: ", ch.method);
      break;
  }
  return { cid, src, cname, avatar, preview: thumbnail, checked: false };
};

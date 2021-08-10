import { ConnectionConfig } from "../../../app/connections";
import { ChannelProps, ChatboxIframe, TheaterElement } from "../../../app/types";

export const convertToChatboxIframe = (
  ch: ChannelProps,
  options: { ratio?: number; w: number; h: number; isEnable: boolean }
): ChatboxIframe => {
  const { cid, cname, avatar, thumbnail, method, streamurl } = ch;
  const { ratio, w, h, isEnable } = options;

  return {
    cid,
    streamurl,
    src: getChatboxSrc(method, streamurl, cname),
    cname,
    avatar,
    preview: thumbnail,
    method,
    ratio: ratio || 0.5625,
    w,
    h,
    isEnable,
  };
};

export const createChatboxIframe = (
  item: TheaterElement,
  options: { ratio?: number; w: number; h: number; isEnable: boolean }
): ChatboxIframe => {
  const { cid, cname, avatar, preview, method, streamurl } = item;
  const { ratio, w, h, isEnable } = options;

  return {
    cid,
    streamurl,
    src: getChatboxSrc(method, streamurl, cname),
    cname,
    avatar,
    preview,
    method,
    ratio: ratio || 0.5625,
    w,
    h,
    isEnable,
  };
};

const getChatboxSrc = (
    method: string,
    streamurl: string,
    cname: string
  ): string => {
    console.log("ConnectionConfig.HostName: ", ConnectionConfig.HostName);
  
    let src = "";
    switch (method) {
      case "youtube":
        let sub = streamurl.match(/https?:\/\/www.youtube.com\/watch\?v=(\S*)/);
        let vedioid = sub ? sub[1] : "";
        src = `//www.youtube.com/live_chat?v=${vedioid}&is_popout=1&embed_domain=${ConnectionConfig.HostName}&dark_theme=1`;
        break;
      case "twitch":
        src = `//www.twitch.tv/embed/${cname}/chat?darkpopout=&secret=safe&parent=${ConnectionConfig.HostName}`;
        break;
      default:
        console.error("缺少對應的處理方式: ", method);
        break;
    }
    return src;
  };

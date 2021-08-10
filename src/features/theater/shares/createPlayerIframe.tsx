import { ConnectionConfig } from "../../../app/connections";
import { ChannelProps, PlayerIframe, TheaterElement } from "../../../app/types";

export const convertToPlayerIframe = (
  ch: ChannelProps,
  options: { ratio?: number; w: number; h: number }
): PlayerIframe => {
  const { cid, cname, avatar, thumbnail, method, streamurl } = ch;
  const { ratio, w, h } = options;

  return {
    cid,
    streamurl,
    src: getPlayerSrc(method, streamurl, cname),
    cname,
    avatar,
    preview: thumbnail,
    method,
    ratio: ratio || 0.5625,
    w,
    h,
  };
};

export const createPlayerIframe = (
  item: TheaterElement,
  options: { ratio?: number; w: number; h: number }
): PlayerIframe => {
  const { cid, cname, avatar, preview, method, streamurl } = item;
  const { ratio, w, h } = options;

  return {
    cid,
    streamurl,
    src: getPlayerSrc(method, streamurl, cname),
    cname,
    avatar,
    preview,
    method,
    ratio: ratio || 0.5625,
    w,
    h,
  };
};

const getPlayerSrc = (
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
        src = `//www.youtube.com/embed/${vedioid}?enablejsapi=1&origin=${ConnectionConfig.HostName}&widgetid=1`;
        break;
      case "twitch":
        src = `//player.twitch.tv?allowfullscreen=false&channel=${cname}&parent=${ConnectionConfig.HostName}&muted=false&autoplay=false`;
        break;
      default:
        console.error("缺少對應的處理方式: ", method);
        break;
    }
    return src;
  };

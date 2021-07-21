import { ChannelProps, IframeProps } from "../../app/types";

export const convertToIframeProps = (
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
  
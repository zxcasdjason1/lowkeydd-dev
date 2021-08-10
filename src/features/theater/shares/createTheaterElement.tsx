import { ChannelProps, TheaterElement } from "../../../app/types";

export const createTheaterElement = (
    ch: ChannelProps,
    options: { checked: boolean }
  ): TheaterElement => {
    const { cid, cname, avatar, streamurl, thumbnail, method } = ch;
    const { checked } = options;
    return {
      cid,
      cname,
      avatar,
      streamurl,
      preview: thumbnail,
      method,
      checked,
    };
  };
import { ChannelCardProps, ChannelProps } from "../../../app/types";

export const createChannelCard = (
    ch: ChannelProps,
    options: {
      group: string,
      heart: boolean;
    }
  ): ChannelCardProps => {
    const { group, heart } = options;
    return {
      ...ch,
      group,
      heart,
    };
  };
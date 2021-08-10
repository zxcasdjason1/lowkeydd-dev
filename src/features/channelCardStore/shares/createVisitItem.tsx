import { CHANNELS_DEFAULT_GROUPNAME, VISITS_DEFAULT_GROUPNAME } from "../../../app/config";
import { ChannelCardProps, FavoredItem, VisitItem } from "../../../app/types";

export const createVisitItem = (
    card: ChannelCardProps | FavoredItem
  ): VisitItem => {
    const { cid, cname, owner, avatar, method, group } = card;
    const groupName =
      group === CHANNELS_DEFAULT_GROUPNAME ? VISITS_DEFAULT_GROUPNAME : group;
    return {
      cid,
      cname,
      owner,
      avatar,
      method,
      group: groupName,
    };
  };
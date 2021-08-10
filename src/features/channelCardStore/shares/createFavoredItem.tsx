import {
  CHANNELS_DEFAULT_GROUPNAME,
  VISITS_DEFAULT_GROUPNAME,
} from "../../../app/config";
import { ChannelCardProps, FavoredItem, VisitItem } from "../../../app/types";

export const createFavoredItem = (
  card: ChannelCardProps | VisitItem,
  options: { isChanged: boolean; isNewAdded: boolean; isDeleted: boolean }
): FavoredItem => {
  const { isChanged, isNewAdded, isDeleted } = options;
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
    isChanged,
    isNewAdded,
    isDeleted,
  };
};

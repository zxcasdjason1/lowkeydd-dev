import {
  CHANNELS_DEFAULT_GROUPNAME,
  CHANNELS_SEARCH_ERROR,
  CHANNELS_SEARCH_FAILED,
  CHANNELS_SEARCH_RESULT,
  VISITS_DEFAULT_GROUPNAME,
} from "../../../app/config";
import { ChannelCardProps, FavoredItem, VisitItem } from "../../../app/types";

export const createFavoredItem = (
  card: ChannelCardProps | VisitItem,
  options: { isChanged: boolean; isNewAdded: boolean; isDeleted: boolean }
): FavoredItem => {
  const { isChanged, isNewAdded, isDeleted } = options;
  const { cid, cname, owner, avatar, method, group } = card;
  const groupName = checkGroupName(group);
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

const checkGroupName = (groupName: string) => {
  switch (groupName) {
    case CHANNELS_DEFAULT_GROUPNAME:
    case CHANNELS_SEARCH_RESULT:
    case CHANNELS_SEARCH_ERROR: //這個應該不會出現
    case CHANNELS_SEARCH_FAILED: //這個應該不會出現
      return VISITS_DEFAULT_GROUPNAME;
    default:
      return groupName;
  }
};

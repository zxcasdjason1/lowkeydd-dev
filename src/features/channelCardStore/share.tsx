import {
  CHANNELS_DEFAULT_GROUPNAME,
  VISITS_DEFAULT_GROUPNAME,
} from "../../app/config";
import {
  ChannelCardProps,
  ChannelProps,
  FavoredItem,
  VisitItem,
} from "../../app/types";

export const createChannelCard = (
  ch: ChannelProps,
  group: string,
  heart: boolean,
): ChannelCardProps => {
  // 表示為自動添加的預設名稱

  return {
    ...ch,
    group,
    heart,
  };
};

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

export const createVMap = <T extends { cid: string }>(
  list: T[]
): Map<string, T> => {
  const mp = new Map<string, T>();
  list.forEach((o) => {
    mp.set(o.cid, o);
  });
  return mp;
};

export const createMap = <T extends { cid: string }>(
  list: T[]
): Map<string, boolean> => {
  const mp = new Map<string, boolean>();
  list.forEach((o) => {
    mp.set(o.cid, true);
  });
  return mp;
};

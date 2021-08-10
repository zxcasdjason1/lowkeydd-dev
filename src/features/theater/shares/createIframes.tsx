import { IframeProps } from "../../../app/types";

export const getListAppendIframe = <T extends IframeProps>(
  list: T[],
  newItem: T
): T[] => {
  const newlist = !list
    ? [newItem]
    : list.filter((o) => o.cid !== newItem.cid).concat(newItem);

  return newlist;
};

export const getListRemoveIframe = <T extends IframeProps>(
  list: T[],
  cid: string
): T[] => {
  const newlist = !list ? [] : list.filter((o) => o.cid !== cid);

  return newlist;
};

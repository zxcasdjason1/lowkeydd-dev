export const useGrouped = function <
  V extends { cid: string; group: string },
  S extends { cid: string }
>(map: V[], list: S[]): { [key: string]: S[] } {
  if (!list) {
    return {};
  }
  const result: { [key: string]: S[] } = {};
  // const resident: S[] = [];

  const mp = new Map<string, V>();
  map.forEach((obj) => {
    mp.set(obj.cid, obj);
  });
  list.forEach((obj) => {
    const cur = mp.get(obj.cid);
    if (cur) {
      const key = cur.group;
      if (!result[key]) {
        result[key] = [obj];
      } else {
        result[key].push(obj);
      }
    } else {
      console.error("發生錯誤，不該有這個");
    }
  });
  return { ...result };
};

export const getGroupMap = <T extends { cid: string; group: string }>(
  list: T[]
): {
  [key: string]: string;
} => {
  const mp: { [key: string]: string } = {};
  list.forEach((item) => (mp[item.cid] = item.group));
  return mp;
};

export const getGroupedView = <T extends { cid: string }>(
  mp: { [key: string]: string },
  group: string[],
  items: T[],
  isResident: boolean
) => {
  const len = group.length;
  const view = Array(isResident ? len+1 : len)
    .fill(0)
    .map(() => Array());

  if (isResident) {
    view[len] = [];
  }

  items.forEach((o) => {
    const groupName = mp[o.cid];
    const ix = groupName ? group.indexOf(groupName) : -1;
    if (ix > -1) {
      view[ix].push(o);
    } else {
      view[len].push(o);
    }
  });
  return view;
};

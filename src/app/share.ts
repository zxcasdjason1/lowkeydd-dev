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
  return { ...result};
};

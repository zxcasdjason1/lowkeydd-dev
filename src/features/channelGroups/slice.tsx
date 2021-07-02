import { createSlice } from "@reduxjs/toolkit";
import {
  ChannelProps,
  ChannelGroupsType,
  VisitList,
  VisitItem,
} from "../../types/index";

const initialState: ChannelGroupsType = {
  group: [],
  value: [[]],
};

const slice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setFavored: (
      state,
      action: {
        type: string;
        payload: { visit: VisitList; channels: ChannelProps[] };
      }
    ) => {
      const { visit, channels } = action.payload;
      const result: ChannelProps[][] = [];
      const other: ChannelProps[] = (result[visit.group.length] = []);
      const mp = new Map<string, VisitItem>();
      visit.list.forEach((item) => mp.set(item.cid, item));
      channels.forEach((ch) => {
        const ix = visit.group.indexOf(mp.get(ch.cid)?.group || "");
        if (ix > -1) {
          if (!result[ix]) {
            result[ix] = [ch];
          } else {
            result[ix].push(ch);
          }
        } else {
          other.push(ch);
        }
      });
      console.log([result]);
      state.value = result;
      state.group = visit.group;
    },
    setResident: (state, action: { type: string; payload: ChannelProps[] }) => {
      state.value[0] = action.payload;
    },
  },
});

export const { setFavored, setResident } = slice.actions;
export default slice.reducer;

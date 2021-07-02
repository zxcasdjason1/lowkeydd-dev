import { createSlice } from "@reduxjs/toolkit";
import { ChannelProps, ChannelGroupsType } from "../../types/index";

const initialState: ChannelGroupsType = {
  main: [],
  undefined: [],
  resident: [],
};

const slice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setFavored: (
      state,
      action: { type: string; payload: ChannelGroupsType }
    ) => {
      const { payload } = action;
      Object.keys(payload).forEach(key => {
        state[key] = payload[key];
      });
    },
    setResident: (state, action: { type: string; payload: ChannelProps[] }) => {
      state["resident"] = action.payload;
    },
  },
});

export const { setFavored, setResident } = slice.actions;
export default slice.reducer;

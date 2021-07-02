import { createSlice } from "@reduxjs/toolkit";
import { VisitList, VisitItem } from "../../types";

const initialState: VisitList = {
  group: [],
  list: [],
};

const slice = createSlice({
  name: "visitlist",
  initialState,
  reducers: {
    setVisitList: (state, action: { type: string; payload: VisitItem[] }) => {
      state.list = action.payload;
    },
    addVisitItem: (state, action: { type: string; payload: VisitItem }) => {
      state.list = [action.payload, ...state.list];
    },
  },
});

export const { setVisitList, addVisitItem } = slice.actions;
export default slice.reducer;

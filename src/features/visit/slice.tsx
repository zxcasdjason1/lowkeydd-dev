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
    setWholeVisit: (state, action: { type: string; payload: VisitList }) => {
      state.group = action.payload.group;
      state.list = action.payload.list;
    },
    setVisitList: (state, action: { type: string; payload: VisitItem[] }) => {
      state.list = action.payload;
    },
    addVisitItem: (state, action: { type: string; payload: VisitItem }) => {
      state.list = [action.payload, ...state.list];
    },
  },
});

export const { setWholeVisit, setVisitList, addVisitItem } =
  slice.actions;
export default slice.reducer;

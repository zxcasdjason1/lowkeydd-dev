import { UserState } from "../../../app/types";

export const setMsg = (
  state: UserState,
  action: { type: string; payload: string | undefined }
) => {
  if (action.payload === undefined) {
    state.msg = "";
  } else {
    state.msg = action.payload;
  }
};

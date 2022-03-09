import { createSlice } from "@reduxjs/toolkit";

import { AppDispatch, RootState } from "../index";

type Token = string;

const initialState: Token = "";

const slice = createSlice({
  name: "token",
  initialState,
  reducers: {
    changed: (state, action) => {
      return action.payload;
    },
  },
});

export const getToken = (state: RootState) => state.token;

export const onChanged =
  (value: string) => (dispatch: AppDispatch, _state: RootState) => {
    dispatch(changed(value));
  };

export const { changed } = slice.actions;

export default slice.reducer;

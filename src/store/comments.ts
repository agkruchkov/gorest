import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE } from "./store";
import { AppDispatch, RootState } from "../index";

export interface Comment {
  id: string;
  name: string;
  email: string;
  body: string;
}

interface ResponseComments {
  data: Comment[];
  totalPages: number;
  currentPage: number;
  countOnPage: number;
}

const initialState: ResponseComments = {
  data: [],
  totalPages: 1,
  currentPage: 1,
  countOnPage: 20,
};

const slice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    fetchedComments: (state, action) => action.payload,
  },
});

export const getComments = (state: RootState) => state.comments;

export const loadComments =
  (postId: string) => async (dispatch: AppDispatch, state: RootState) => {
    try {
      const response = await axios.get(`${BASE}posts/${postId}/comments`);
      dispatch(
        fetchedComments({
          data: response.data,
          totalPages: Number(response.headers["x-pagination-pages"]),
          currentPage: Number(response.headers["x-pagination-page"]),
          countOnPage: Number(response.headers["x-pagination-limit"]),
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const { fetchedComments } = slice.actions;

export default slice.reducer;

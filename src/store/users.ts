import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { AppDispatch, RootState } from "../index";
import { BASE } from "./store";

export interface User {
  id: string;
  name: string;
  email: string;
  status: string;
  gender: string;
}

interface ResponseUsers {
  data: User[];
  totalPages: number;
  currentPage: number;
  countOnPage: number;
}

const initialState: ResponseUsers = {
  data: [],
  totalPages: 1,
  currentPage: 1,
  countOnPage: 20,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchedUsers: (state, action) => action.payload,
  },
});

export const getUsers = (state: RootState) => state.users;

export const loadUsers =
  (page: number) => async (dispatch: AppDispatch, state: RootState) => {
    try {
      const response = await axios.get(`${BASE}users?page=${page}`);
      dispatch(
        fetchedUsers({
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

export const { fetchedUsers } = slice.actions;

export default slice.reducer;

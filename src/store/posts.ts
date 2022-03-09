import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { AppDispatch, RootState } from "../index";
import { BASE } from "./store";
import { IFormFields } from "../components";

export interface Post {
  id: string;
  title: string;
  body: string;
  user_id: string;
}

interface ResponsePosts {
  data: Post[];
  totalPages: number;
  currentPage: number;
  countOnPage: number;
}

const initialState: ResponsePosts = {
  data: [],
  totalPages: 1,
  currentPage: 1,
  countOnPage: 20,
};

const slice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchedPosts: (state, action) => action.payload,
    createdPost: (state, action) => ({
      ...state,
      data: [...state.data, action.payload],
    }),
    editedPost: (state, action) => ({
      ...state,
      data: [...state.data].map((post) =>
        post.id === action.payload.id ? action.payload : post
      ),
    }),
  },
});

export const getPosts = (state: RootState) => state.posts;

export const loadPosts =
  (page: number, userId?: string) =>
  async (dispatch: AppDispatch, state: RootState) => {
    try {
      const response = await axios.get(
        userId
          ? `${BASE}users/${userId}/posts?page=${page}`
          : `${BASE}posts?page=${page}`
      );
      dispatch(
        fetchedPosts({
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

export const createPost =
  (post: IFormFields, userId: string, token: string) =>
  async (dispatch: AppDispatch, state: RootState) => {
    const formattedData = {
      title: post.title,
      body: post.body,
      userId,
    };
    try {
      await axios.post(`${BASE}users/${userId}/posts`, formattedData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(createdPost(formattedData));
    } catch (error) {
      console.log(error);
    }
  };

export const editPost =
  (post: Post, token: string) =>
  async (dispatch: AppDispatch, state: RootState) => {
    try {
      await axios.patch(`${BASE}posts/${post.id}`, post, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(editedPost(post));
    } catch (error) {
      console.log(error);
    }
  };

export const { fetchedPosts, createdPost, editedPost } = slice.actions;

export default slice.reducer;

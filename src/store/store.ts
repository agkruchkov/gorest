import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "./posts";
import usersReducer from "./users";
import tokenReducer from "./token";
import commentsReducer from "./comments";

export const BASE = "https://gorest.co.in/public/v2/";

const configureAppStore = () =>
  configureStore({
    reducer: combineReducers({
      posts: postsReducer,
      users: usersReducer,
      token: tokenReducer,
      comments: commentsReducer,
    }),
  });

export default configureAppStore;

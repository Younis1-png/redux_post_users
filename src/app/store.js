import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/PostSlice";
import userReducer from "../features/users/UserSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: userReducer,
  },
});

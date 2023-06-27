"use client";

import { configureStore } from "@reduxjs/toolkit";
import postArticleReducer from "./postArticleSlice";

export const store = configureStore({
  reducer: {
    postArticle: postArticleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

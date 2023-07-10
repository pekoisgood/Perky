"use client";

import { createSlice } from "@reduxjs/toolkit";
import { SavedArticle } from "@/app/profile/savedArticle/page";

type InitialState = {
  value: SavedArticle[] | null;
};

const initialState = {
  value: null,
} as InitialState;

export const savedArticleSlice = createSlice({
  name: "articleRecord",
  initialState: initialState,
  reducers: {
    setSavedArticle: (state, actions) => {
      return {
        value: actions.payload,
      };
    },
  },
});

export const { setSavedArticle } = savedArticleSlice.actions;
export const savedArticleReducer = savedArticleSlice.reducer;

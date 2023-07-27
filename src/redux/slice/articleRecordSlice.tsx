"use client";

import { createSlice } from "@reduxjs/toolkit";
import { Article } from "@/utils/types/types";

type InitialState = {
  value: Article[] | null;
};

const initialState = {
  value: null,
} as InitialState;

export const articleRecordSlice = createSlice({
  name: "articleRecord",
  initialState: initialState,
  reducers: {
    setRecord: (state, actions) => {
      return {
        value: actions.payload,
      };
    },
  },
});

export const { setRecord } = articleRecordSlice.actions;
export const articleRecordReducer = articleRecordSlice.reducer;

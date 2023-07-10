"use client";

import { createSlice } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";

export type Articles = {
  id: string;
  authorName: string;
  category: string;
  authorUserId: string;
  content: string;
  createdAt: Timestamp | null;
  tags: string[];
  title: string;
  image: string;
  starCounts?: number;
};

type InitialState = {
  value: Articles[] | null;
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

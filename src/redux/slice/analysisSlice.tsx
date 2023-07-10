"use client";

import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  value: {
    records: Date[];
    bookClubs: Date[];
  } | null;
};

const initialState = {
  value: null,
} as InitialState;

export const analysisSlice = createSlice({
  name: "analysis",
  initialState: initialState,
  reducers: {
    setAnalysis: (state, actions) => {
      return {
        value: {
          records: actions.payload.records,
          bookClubs: actions.payload.bookClubs,
        },
      };
    },
  },
});

export const { setAnalysis } = analysisSlice.actions;
export const analysisReducer = analysisSlice.reducer;

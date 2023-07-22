"use client";

import { createSlice } from "@reduxjs/toolkit";
import { AuthRedux } from "@/utils/types/types";

type InitialState = {
  value: AuthRedux;
};

const initialState = {
  value: {
    id: "",
    name: "",
    avatar: "",
    isLogin: null,
  } as AuthRedux,
} as InitialState;

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logIn: (state, actions) => {
      return {
        value: {
          id: actions.payload.id,
          name: actions.payload.name,
          avatar: actions.payload.avatar,
          isLogin: true,
        },
      };
    },
    logout: () => {
      return {
        value: {
          id: "",
          name: "",
          avatar: "",
          isLogin: false,
        },
      };
    },
  },
});

export const { logIn, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

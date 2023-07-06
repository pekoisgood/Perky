"use client";

import { createSlice } from "@reduxjs/toolkit";

type Auth = {
  id: string;
  name: string;
  avatar: string;
  isLogin: boolean | null;
};

type InitialState = {
  value: Auth;
};

const initialState = {
  value: {
    id: "",
    name: "",
    avatar: "",
    isLogin: null,
  } as Auth,
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

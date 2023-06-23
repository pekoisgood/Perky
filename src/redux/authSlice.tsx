"use client";
import { createSlice } from "@reduxjs/toolkit";

type Auth = {
  id: string;
  name: string;
  avatar: string;
};

type InitialState = {
  value: Auth;
};

const initialState = {
  value: {
    id: "",
    name: "",
    avatar: "",
    isLogin: false,
  } as Auth,
} as InitialState;

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, actions) => {
      return {
        value: {
          ...state.value,
          id: actions.payload.id,
          name: actions.payload.name,
          avatar: actions.payload.avatar,
        },
      };
    },
    logout: () => {
      return {
        value: {
          id: "",
          name: "",
          avatar: "",
        },
      };
    },
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

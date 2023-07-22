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
    email: "",
    isLogin: null,
  } as AuthRedux,
} as InitialState;

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: () => {
      return {
        value: {
          ...initialState.value,
          isLogin: false,
        },
      };
    },
    setUser: (state, actions) => {
      const user = actions.payload;
      const prev = state.value;
      return {
        value: {
          id: user.id ?? prev.id,
          name: user.name ?? prev.name,
          avatar: user.avatar ?? prev.avatar,
          email: user.email ?? prev.email,
          isLogin: true,
        },
      };
    },
    setIsLogin: (state, actions) => {
      return {
        value: {
          ...state.value,
          isLogin: actions.payload,
        },
      };
    },
  },
});

export const { logout, setUser, setIsLogin } = authSlice.actions;
export const authReducer = authSlice.reducer;

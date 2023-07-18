"use client";

import { createSlice } from "@reduxjs/toolkit";

type GuestInfo = {
  name: string;
  id: string;
  avatar: string;
};

type InitialState = {
  value: GuestInfo[];
};

const initialState = {
  value: [],
} as InitialState;

export const bookClubMeetingSlice = createSlice({
  name: "bookClubMeeting",
  initialState: initialState,
  reducers: {
    setBookClubMeetingGuest: (state, actions) => {
      return {
        value: [
          ...state.value,
          {
            name: actions.payload.name,
            avatar: actions.payload.avatar,
            id: actions.payload.id,
          },
        ],
      };
    },
  },
});

export const { setBookClubMeetingGuest } = bookClubMeetingSlice.actions;
export const bookClubMeetingReducer = bookClubMeetingSlice.reducer;

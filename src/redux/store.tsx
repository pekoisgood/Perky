import { configureStore } from "@reduxjs/toolkit";
import postArticleReducer from "./slice/postArticleSlice";
import calenderReducer from "./slice/calenderSlice";

import { authReducer } from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    postArticle: postArticleReducer,
    calender: calenderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

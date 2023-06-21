import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";

import postArticleReducer from "./postArticleSlice";
import calenderReducer from "./calenderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    postArticle: postArticleReducer,
    calender: calenderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import postArticleReducer from "./slice/postArticleSlice";
import calenderReducer from "./slice/calenderSlice";

import { authReducer } from "./slice/authSlice";
import { articleRecordReducer } from "./slice/articleRecordSlice";
import { savedArticleReducer } from "./slice/savedArticle";
import { analysisReducer } from "./slice/analysisSlice";
import { bookClubMeetingReducer } from "./slice/bookClubMeetingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    postArticle: postArticleReducer,
    calender: calenderReducer,
    articleRecord: articleRecordReducer,
    savedArticle: savedArticleReducer,
    analysis: analysisReducer,
    bookClubMeeting: bookClubMeetingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

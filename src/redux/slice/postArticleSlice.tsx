import { createSlice } from "@reduxjs/toolkit";
import { postArticle } from "@/utils/types/types";

type InitialStateValue = {
  value: postArticle;
};

const initailState = {
  value: {
    title: "",
    content: "",
    category: "Frontend",
    tags: [],
  } as postArticle,
} as InitialStateValue;

export const postArticleSlice = createSlice({
  name: "postArticleContent",
  initialState: initailState,
  reducers: {
    handleUpdateArticle: (state, actions) => {
      switch (actions.payload.action) {
        case "UPDATE_TAGS":
          return {
            value: {
              ...state.value,
              tags: [...state.value.tags, actions.payload.value],
            },
          };
        case "DELETE_TAG":
          return {
            value: {
              ...state.value,
              tags: state.value.tags.filter(
                (tag) => tag !== actions.payload.value
              ),
            },
          };
        case "UPDATE_INPUTS":
          return {
            value: {
              ...state.value,
              [actions.payload.key]: actions.payload.value,
            },
          };
        default:
          return state;
      }
    },
    handlePostArticle: () => {
      return initailState;
    },
    handleShowImage: () => {
      return initailState;
    },
  },
});

export const { handleUpdateArticle, handlePostArticle, handleShowImage } =
  postArticleSlice.actions;
export default postArticleSlice.reducer;

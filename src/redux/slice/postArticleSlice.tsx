import { createSlice } from "@reduxjs/toolkit";

export type Article = {
  title: string;
  content: string;
  category: string;
  tags: string[];
};

type InitialStateValue = {
  value: Article;
};

const initailState = {
  value: {
    title: "",
    content: "",
    category: "Frontend",
    tags: [],
  } as Article,
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
  },
});

export const { handleUpdateArticle, handlePostArticle } =
  postArticleSlice.actions;
export default postArticleSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export type Article = {
  title: string;
  content: string;
  category: string;
  tags: string[];
  // showImage: boolean;
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
    // showImage: true,
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
      // state.value.showImage = false;
      // setTimeout(() => {
      //     console.log("=======set======");
      //   state.value.showImage = true;
      // }, 3000);
      return initailState;
    },
    // handleShowImage: () => {
    //   return {
    //     ...initailState,
    //     showImage: true,
    //   };
    // },
  },
});

export const { handleUpdateArticle, handlePostArticle } =
  postArticleSlice.actions;
export default postArticleSlice.reducer;

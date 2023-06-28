import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CalrenderState = {
  year: number;
  month: number;
  date: number;
};

type InitialStateValue = {
  value: CalrenderState;
};

const initailState = {
  value: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  } as CalrenderState,
} as InitialStateValue;

export const calenderSlice = createSlice({
  name: "calender",
  initialState: initailState,
  reducers: {
    // switch (action.type){
    //     case "HANDLE_PREV_MONTH"
    //         return {
    //             value: {
    //               year: state.value.year,
    //               month: state.value.month - 1,
    //               date: 0,
    //             },

    //     default:
    //         return state
    // }

    // }
    hadlePrevMonth: (state) => {
      if (state.value.month > 1) {
        return {
          value: {
            ...state.value,
            month: state.value.month - 1,
          },
        };
      }
      return {
        value: {
          ...state.value,
          year: state.value.year - 1,
          month: 12,
        },
      };
    },
    handleNexMonth: (state) => {
      if (state.value.month < 12) {
        return {
          value: {
            ...state.value,
            month: state.value.month + 1,
          },
        };
      }
      return {
        value: { ...state.value, year: state.value.year + 1, month: 1 },
      };
    },
    handleSelectDate: (state, actions: PayloadAction<number>) => {
      return {
        value: {
          ...state.value,
          date: actions.payload,
        },
      };
    },
  },
});

export const { hadlePrevMonth, handleNexMonth, handleSelectDate } =
  calenderSlice.actions;
export default calenderSlice.reducer;

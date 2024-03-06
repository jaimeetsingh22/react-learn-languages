import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: StateType = {
  loading: false,
  words: [],
  result: [],
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    getWordsRequest: (state) => {
      state.loading = true;
    },
    getWordSuccess: (state, action:PayloadAction<WordType[]| undefined>) => {
      state.loading = false;
      state.words = action.payload ? [...action.payload] : [];
    },
    getWordsFail: (state, action:PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;

    },
    saveResult:(state,action: PayloadAction<string[]>)=>{
        state.loading = false;
        state.result = action.payload
    },
    clearState:(state)=>{
        state.loading = false;
        state.result = [];
        state.words = [];
        state.error= undefined;
    },

  },
});

export const  {getWordsRequest, getWordSuccess, getWordsFail,saveResult,clearState} = rootSlice.actions;

export default rootSlice.reducer;

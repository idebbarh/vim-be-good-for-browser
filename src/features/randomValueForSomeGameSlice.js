import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const randomValueForSomeGameSlice = createSlice({
  name: "randomValueForSomeGame",
  initialState,
  reducers: {
    setRandomValueForSomeGame: (state, action) => {
      state.value = action.payload;
    },
    resitRandomValueForSomeGame: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { setRandomValueForSomeGame, resitRandomValueForSomeGame } =
  randomValueForSomeGameSlice.actions;

export const selecteRandomValueForSomeGame = (state) =>
  state.randomValueForSomeGame.value;

export default randomValueForSomeGameSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isGameStarted: false,
    gameType: "relative",
    gameDifficulty: "easy",
  },
};

export const gameInfoSlice = createSlice({
  name: "gameInfo",
  initialState,
  reducers: {
    setGameInfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setGameInfo } = gameInfoSlice.actions;

export const selectGameInfo = (state) => state.gameInfo.value;

export default gameInfoSlice.reducer;

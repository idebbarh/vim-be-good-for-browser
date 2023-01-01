import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isGameStarted: false,
    gameType: "relative",
    gameDifficulty: "easy",
    isEndGameOptinsOpen: false,
    gameText: "DELETE_ME",
    isGameCountdownDone: false,
  },
};

export const gameInfoSlice = createSlice({
  name: "gameInfo",
  initialState,
  reducers: {
    setGameInfo: (state, action) => {
      state.value = action.payload;
    },
    resitGameInfo: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { setGameInfo, resitGameInfo } = gameInfoSlice.actions;

export const selectGameInfo = (state) => state.gameInfo.value;

export default gameInfoSlice.reducer;

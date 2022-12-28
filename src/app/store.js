import { configureStore } from "@reduxjs/toolkit";
import cursorPosReducer from "../features/cursorPosSlice.js";
import gameInfoReducer from "../features/gameInfoSlice.js";
export const store = configureStore({
  reducer: {
    cursorPos: cursorPosReducer,
    gameInfo: gameInfoReducer,
  },
});

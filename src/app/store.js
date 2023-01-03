import { configureStore } from "@reduxjs/toolkit";
import cursorPosReducer from "../features/cursorPosSlice.js";
import gameInfoReducer from "../features/gameInfoSlice.js";
import randomValueForSomeGameReducer from "../features/randomValueForSomeGameSlice";
import endOfTheGameStatisReducer from "../features/endOfTheGameStatisSlice";
export const store = configureStore({
  reducer: {
    cursorPos: cursorPosReducer,
    gameInfo: gameInfoReducer,
    randomValueForSomeGame: randomValueForSomeGameReducer,
    endOfTheGameStatis: endOfTheGameStatisReducer,
  },
});

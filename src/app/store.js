import { configureStore } from "@reduxjs/toolkit";
import cursorPosReducer from "../features/cursorPosSlice.js";

export const store = configureStore({
  reducer: {
    cursorPos: cursorPosReducer,
  },
});

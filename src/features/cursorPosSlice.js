import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [0, 0],
};

export const cursorPosSlice = createSlice({
  name: "cursorPos",
  initialState,
  reducers: {
    setNewValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setNewValue } = cursorPosSlice.actions;

export const selectCursorPos = (state) => state.cursorPos.value;

export default cursorPosSlice.reducer;

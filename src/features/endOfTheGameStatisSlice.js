import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const endOfTheGameStatisSlice = createSlice({
  name: "endOfTheGameStatis",
  initialState,
  reducers: {
    setEndOfTheGameStatis: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setEndOfTheGameStatis } = endOfTheGameStatisSlice.actions;

export const selectEndOfTheGameStatis = (state) =>
  state.endOfTheGameStatis.value;

export default endOfTheGameStatisSlice.reducer;

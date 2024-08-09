import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: localStorage.getItem("view") || "grid",
};

export const gridModeSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    toogleViewMode: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem("view", state.mode);
    },
  },
});

export const { toogleViewMode } = gridModeSlice.actions;
export default gridModeSlice.reducer;

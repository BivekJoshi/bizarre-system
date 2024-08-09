import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: localStorage.getItem("themeMode") || "light", 
};

export const darkModeSlice = createSlice({
  name: "themeMode",
  initialState,
  reducers: {
    toogleDarkMode: (state, action) => {
      state.mode = action.payload; 
      localStorage.setItem("themeMode", state.mode); 
    },
  },
});

export const { toogleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;

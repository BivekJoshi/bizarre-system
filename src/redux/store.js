import { configureStore } from "@reduxjs/toolkit";
import darkModeSlice from "./Slice/darkModeSlice";
import gridModeSlice from "./Slice/gridModeSlice";

export const store = configureStore({
  reducer: {
    themeMode: darkModeSlice,
    view: gridModeSlice,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import darkModeSlice from "./Slice/darkModeSlice";
import gridModeSlice from "./Slice/gridModeSlice";
import cartSlice from "./Slice/cartSlice";
// import { cardSlice } from "./Slice/cartSlice";

export const store = configureStore({
  reducer: {
    themeMode: darkModeSlice,
    view: gridModeSlice,
    cart: cartSlice,
  },
});

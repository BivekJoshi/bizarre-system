import { configureStore } from "@reduxjs/toolkit";
import darkModeSlice from "./Slice/darkModeSlice";
import gridModeSlice from "./Slice/gridModeSlice";
import cartSlice from "./Slice/cartSlice";
import selectedItemsSlice from "./Slice/selectedItemsSlice";
import userIdSlice from "./Slice/userIdSlice";
// import { cardSlice } from "./Slice/cartSlice";

export const store = configureStore({
  reducer: {
    themeMode: darkModeSlice,
    view: gridModeSlice,
    cart: cartSlice,
    selectedItems: selectedItemsSlice,
    user: userIdSlice,
  },
});

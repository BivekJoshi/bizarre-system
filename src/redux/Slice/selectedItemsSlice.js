// store/selectedItemsSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState: {
    selectedIds: [],
  },
  reducers: {
    toggleSelectItem: (state, action) => {
      const itemId = action.payload;
      if (state.selectedIds.includes(itemId)) {
        state.selectedIds = state.selectedIds.filter((id) => id !== itemId);
      } else {
        state.selectedIds.push(itemId);
      }
    },
  },
});

export const { toggleSelectItem } = selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;

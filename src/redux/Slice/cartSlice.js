import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  quantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      state.quantity += 1; // Increment the quantity for each item added
    },
    // Optionally, you can add more reducers to handle other actions like removeFromCart, clearCart, etc.
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

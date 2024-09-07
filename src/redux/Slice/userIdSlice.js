// redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
};

const userIdSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = userIdSlice.actions;

export default userIdSlice.reducer;

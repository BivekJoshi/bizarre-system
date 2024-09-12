import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userType: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload.userId;
      state.userType = action.payload.userType;
    },
    clearUser: (state) => {
      state.userId = null;
      state.userType = null;
    },
  },
});

export const { setUserId, clearUser } = userSlice.actions;
export default userSlice.reducer;

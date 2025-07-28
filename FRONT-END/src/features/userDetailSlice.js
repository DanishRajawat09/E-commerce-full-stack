import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

const userDetailSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    addUserData: (state, action) => {
      state.userData = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
    },
  },
});

export const { addUserData, clearUserData } = userDetailSlice.actions;

export default userDetailSlice.reducer;

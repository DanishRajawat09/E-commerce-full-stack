import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
};

const userDetailSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    addUserData: (state, action) => {
      state.userData = action.payload;
    },
    clearUserData: (state) => {
      state.userData = {};
    },
  },
});

export const { addUserData, clearUserData } = userDetailSlice.actions;

export default userDetailSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenAccountBar: false,
};

const accountBarSlice = createSlice({
  name: "accountBarSlice",
  initialState,
  reducers: {
    openAccountBar: (state) => {
      state.isOpenAccountBar = true;
    },
    closeAccountBar: (state) => {
      state.isOpenAccountBar = false;
    },
  },
});


export const {openAccountBar , closeAccountBar} = accountBarSlice.actions

export default accountBarSlice.reducer
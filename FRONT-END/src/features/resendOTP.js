import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  contact: "",
};

const resedOTPSlice = createSlice({
  name: "resendOTP",
  initialState,
  reducers: {
    addOTPData: (state, action) => {
      (state.email = action.payload.email),
        (state.contact = action.payload.contact);
    },
    clearOTPData: (state) => {
      (state.email = ""), (state.contact = "");
    },
  },
});

export const { addOTPData, clearOTPData } = resedOTPSlice.actions;

export default resedOTPSlice.reducer;

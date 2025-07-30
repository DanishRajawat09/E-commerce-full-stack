import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorMessage: "",
  successMessage: "",
  open: false,
};

const snackBarSlice = createSlice({
  name: "snackBarSlice",
  initialState,
  reducers: {
    showSuccessMessage: (state, action) => {
      state.successMessage = action.payload.successMessage;
      state.errorMessage = "";
      state.open = action.payload.open;
    },
    showErrorMessage: (state, action) => {
      state.errorMessage = action.payload.errorMessage;
      state.successMessage = "";
      state.open = action.payload.open;
    },
    clearAllMessage: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
       state.open = false;
    },

  },
});

export const { showSuccessMessage, showErrorMessage, clearAllMessage } =
  snackBarSlice.actions;

export default snackBarSlice.reducer;

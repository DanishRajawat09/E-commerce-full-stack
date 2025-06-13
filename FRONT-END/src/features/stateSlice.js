import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
    filOpen: false
}

export const sideBarSlice = createSlice({
    name: "sideBarState",
    initialState,
    reducers: {
        isOpen: (state, action) => {
            state.open = action.payload?.open ?? state.open;
        },
        filterOpen: (state, action) => {
            state.filOpen = action.payload?.filOpen ?? state.filOpen;
        }

    }
})

export const { isOpen, filterOpen } = sideBarSlice.actions

export default sideBarSlice.reducer
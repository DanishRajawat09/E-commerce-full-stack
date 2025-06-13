import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    total : 0
}

const cartCalc = createSlice({
    name : "calc",
    initialState,
    reducers : {
        addCalc : (state , action) =>{
            state.total = action.payload.totalPrice
        }
    }
})

 export  const {addCalc} = cartCalc.actions

 export default cartCalc.reducer
import { createSlice } from "@reduxjs/toolkit";

const initialState = [

]

const cartSlice = createSlice({
    name: "handleCart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const cartProduct = {
                crtProdId: action.payload. crtProdId,
                crtProdTitle: action.payload.crtProdTitle,
                crtProdImg: action.payload.crtProdImg,
                crtProdQuantity: action.payload.crtProdQuantity,
                crtProdSize: action.payload.crtProdSize,
                crtProdPrice: action.payload.crtProdPrice
            }
            state.push(cartProduct)
        },
        removeProduct: (state, action) => {
            return state.filter((item) => item.crtProdId !== action.payload.crtProdId
            )
        },
updateProduct : (state , action) => {

   return state = state.map((item) => {
        return item.crtProdId === action.payload.crtProdId
          ? { ...item, ...action.payload } // Update the matching item
          : item; // Keep other items unchanged
      });
    }
}})

export const { addToCart, removeProduct,updateProduct } = cartSlice.actions

export default cartSlice.reducer
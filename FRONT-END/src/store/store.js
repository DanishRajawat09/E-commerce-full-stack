import { configureStore } from "@reduxjs/toolkit";
import sideBarSliceReducer from "../features/stateSlice"
import ProductData from "../features/productData";
import cartSlice from "../features/cartSlice";
import CartCalc from "../features/cartCalc"

const store = configureStore({
    reducer: {
        state: sideBarSliceReducer,
        product: ProductData,
        cartProduct: cartSlice,
        calc: CartCalc
    }
})

export default store
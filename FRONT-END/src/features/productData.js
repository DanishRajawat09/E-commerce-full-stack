import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
{
    
}
]

const productData = createSlice({
    name : "Products",
    initialState,
    reducers : {
        addProduct : (state , action) => {
           const product = {
            id : action.payload.id,
            productImage : action.payload.img,
            productTitle : action.payload.title,
            productRating : action.payload.rating,
            productPrice : action.payload.price,
            productActualPrice : action.payload.actualPrice,
            productRatingImg : action.payload.starImg,
            productDesc : action.payload.desc
            }
            state.shift()
            state.push(product)
        }
    }
})

export const {addProduct} = productData.actions

export default productData.reducer
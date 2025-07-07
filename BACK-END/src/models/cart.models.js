import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    cartOwner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    products : [
      {
          product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Product"
            },
            quantity : {
                type : Number,
                default : 0,
                min : 0,
             max : 10
            },
            priceAtAdd : {
                type : Number,
                min : 0,
                default : 0
            } 

      }
    ]
} , {timestamps : true})


export const Cart = mongoose.model("Cart" , cartSchema)
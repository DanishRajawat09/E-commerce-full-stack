import mongoose, { mongo } from "mongoose";

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
                required : true,
                ref : "Product"
            }
      }
    ]
} , {timestamps : true})
import mongoose  from "mongoose";

const reviewSchema = new mongoose.Schema({
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref  : "Products",
        required : true
    },
    rating : {
        type : Number,
        min : 0,
        max : 5,
        default : 0,
        required : true
    },
    review : {
        type : String,
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
}, {timestamps : true})

export const Review = mongoose.model("Review" , reviewSchema) 
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default : ""
    },
    category: {
      type: String,
      enum: ["mobile", "dress"], 
      required: true,
    },
    admin : {
      type : mongoose.Schema.Types.ObjectId,
      ref  :"User",
      required : true
    },
    stock : {
      type : Number,
      required : true,
      default : 0,
      min : 0
    },
    rating: {
      type: Number, 
      default: 0,
      min: 0,
      max: 5,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: true,
      validate: [
        {
          validator: function (val) {
            return Array.isArray(val) && val.length > 0;
          },
          message: "At least one image is required.",
        },
        {
          validator: function (val) {
            return val.length <= 3;
          },
          message: "You can upload a maximum of 3 images.",
        },
      ],
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);


export const Product = mongoose.model("Product" , productSchema)
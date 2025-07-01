import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: 1,
        },
        priceAtPurchase: {
          type: Number,
          required: true,
          default: 0,
          min: 0,
        },
      },
    ],
    paymentStatus: {
      type: String,
      required: true,
      enum: ["Panding", "Paid", "Failed"],
      default: "Panding",
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ["Processing", "Shipped", "delivered", "cancelled"],
      default: "Processing",
    },
     deliveredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdminProfile",
    default: null
  }
  },

  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);

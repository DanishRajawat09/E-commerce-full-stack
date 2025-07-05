import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
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
        deliveredBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "AdminProfile",
          default: null,
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
  },

  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);

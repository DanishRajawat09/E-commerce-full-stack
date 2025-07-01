import mongoose from "mongoose";

const adminProfileSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    shopAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    shopName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const AdminProfile = mongoose.model("AdminProfile", adminProfileSchema);

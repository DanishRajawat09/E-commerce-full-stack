import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  JWT_ACCESSTOKEN_EXPIRY,
  JWT_ACCESSTOKEN_SECRET,
  JWT_REFRESHTOKEN_EXPIRY,
  JWT_REFRESHTOKEN_SECRET,
} from "../../config/env.js";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "enter an velid email",
      },
      unique: true,
      lowercase: true,
    },
    contact: {
      type: String,
      trim: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^\+?[1-9]\d{1,14}$/.test(value);
        },
        message: "enter an valid number",
      },
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      required: true,
      default: "local",
    },
    password: {
      type: String,
      required: function () {
        return this.authProvider === "local";
      },
      validate: {
        validator: function (value) {
          if (this.authProvider === "local") {
            return typeof value === "string" && value.length >= 6;
          }
          return true;
        },
        message:
          "Password is required and must be at least 6 characters for local auth",
      },
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);

  next();
});

userSchema.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.generateAccessToken = async function () {
  return jwt.sign(
    { _id: this._id, email: this.email },
    JWT_ACCESSTOKEN_SECRET,
    { expiresIn: JWT_ACCESSTOKEN_EXPIRY }
  );
};
userSchema.generateRefreshToken = async function () {
  return jwt.sign(
    { _id: this._id, email: this.email },
    JWT_REFRESHTOKEN_SECRET,
    { expiresIn: JWT_REFRESHTOKEN_EXPIRY }
  );
};
export const User = mongoose.model("User", userSchema);

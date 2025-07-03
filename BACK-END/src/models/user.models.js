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

      lowercase: true,
    },
    contact: {
      type: String,
      trim: true,

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
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
      default: "user",
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      default: "",
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      default: "",
    },
    adminProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminProfile",
      default: "",
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    otp: {
      type: String,
      trim: true,
    },
    otpExpiry: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  // Only hash OTP if it’s being updated
  if (update.otp) {
    const hashedOtp = await bcrypt.hash(update.otp, 10);
    this.setUpdate({ ...update, otp: hashedOtp });
  }

  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    { _id: this._id, email: this.email, role: this.role },
    JWT_ACCESSTOKEN_SECRET,
    { expiresIn: JWT_ACCESSTOKEN_EXPIRY }
  );
};
userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign({ _id: this._id, role: this.role }, JWT_REFRESHTOKEN_SECRET, {
    expiresIn: JWT_REFRESHTOKEN_EXPIRY,
  });
};
export const User = mongoose.model("User", userSchema);

import { User } from "../models/user.models.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
const verifyOtp = asyncHandler(async (req, res, next) => {
  const { otp } = req.body;
  const id = req.user.id;

  if (!otp) {
throw new ApiError(400, "OTP is required.");
  }

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  if (!user.otpExpiry || user.otpExpiry < new Date()) {
    throw new ApiError(401, "OTP has expired. Please request a new one.");
  }

  const isOtp = bcrypt.compare(otp, user.otp);

  if (!isOtp) {
    throw new ApiError(401, "Invalid OTP. Please check and try again.");
  }

  req.user = user;

  next();
});

export default verifyOtp;

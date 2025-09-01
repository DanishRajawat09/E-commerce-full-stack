import { User } from "../models/user.models.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
const verifyOtp = asyncHandler(async (req, res, next) => {
  const { otp } = req.body;
  const id = req.user._id;

  if (!otp) {
    throw new ApiError(422, "OTP is required.");
  }

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }
  if (!user.otpExpiry || new Date(user.otpExpiry).getTime() < Date.now()) {
    console.log("OTP expired at:", user.otpExpiry);
    throw new ApiError(403, "OTP has expired. Please request a new one.");
  }

  const isOtpValid = await bcrypt.compare(otp, user.otp);

  if (!isOtpValid) {
    throw new ApiError(401, "The OTP you entered is incorrect.");
  }
  if (user.isVerified === false) {
    user.isVerified = true;
  }
  req.user = user;

  next();
});

export default verifyOtp;

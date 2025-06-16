import { User } from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt"
const verifyOtp = asyncHandler(async (req ,res , next) => { 
     const { otp, id } = req.body;

  if (!otp) {
    throw new ApiError(400, "enter otp");
  }

  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(500, "database error we cant find user");
  }

  if (user.otpExpiry < new Date()) {
    throw new ApiError(401, "otp is expired");
  }

  const isOtp = bcrypt.compare(otp, user.otp);

  if (!isOtp) {
    throw new ApiError(500, "incorrect otp");
  }

  req.user = user

  next()
 })


 export default verifyOtp
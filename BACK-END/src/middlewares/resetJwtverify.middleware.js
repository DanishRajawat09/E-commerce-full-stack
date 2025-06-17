import { JWT_RESET_SECRET } from "../../config/env.js";
import { User } from "../models/user.models.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const otpAuth = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.resetToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(400, "unauthorized user");
  }

  const decoded = jwt.verify(token, JWT_RESET_SECRET);

  if (!decoded) {
    throw new ApiError(400, "Unauthorized user");
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  req.user = user;

  next();
});

export default otpAuth;

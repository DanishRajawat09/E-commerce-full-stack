import { JWT_RESET_SECRET } from "../../config/env.js";
import { User } from "../models/user.models.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const resetJwt = (expactedPurpose = "") =>
  asyncHandler(async (req, res, next) => {
    const token =
      req.cookies?.resetToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Reset token is missing or unauthorized access.");
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_RESET_SECRET);
    } catch (error) {
      throw new ApiError(401, "Invalid or expired reset token.");
    }

    if (!decoded || !decoded.id) {
      throw new ApiError(401, "Invalid token payload.");
    }

    if (decoded.purpose !== expactedPurpose) {
      throw new ApiError(403, "Token not valid for this operation");
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new ApiError(404, "User associated with this token was not found.");
    }

    req.user = user;

    next();
  });

export default resetJwt;

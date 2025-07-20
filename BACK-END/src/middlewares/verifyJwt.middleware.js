import {
  JWT_ACCESSTOKEN_SECRET,
  JWT_REFRESHTOKEN_SECRET,
} from "../../config/env.js";
import { User } from "../models/user.models.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
const verifyJwt = (tokenKey) =>
  asyncHandler(async (req, res, next) => {
    const token =
      req.cookies?.[tokenKey] ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(
        401,
        "Authentication token is missing. Please login again."
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_ACCESSTOKEN_SECRET);
    } catch (error) {
      throw new ApiError(401, "Invalid or expired token. Please login again.");
    }

    if (!decoded || !decoded._id || !decoded.role) {
      throw new ApiError(400, "Invalid token payload.");
    }

    const user = await User.findOne({ _id: decoded._id, role: decoded.role });

    if (!user) {
      throw new ApiError(
        404,
        `${decoded.role === "admin" ? "Admin" : "User"} not found or no longer exists. Please register or login again.`
      );
    }

    req.user = user;
    next();
  });

export const verifyJwtUser = verifyJwt("userAccessToken");
export const verifyJwtAdmin = verifyJwt("adminAccessToken");

const verifyJwtRefresh = (tokenKey) =>
  asyncHandler(async (req, res, next) => {
    const token =
      req.cookies?.[tokenKey] ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(
        401,
        "Authentication token is missing. Please login again."
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_REFRESHTOKEN_SECRET);
    } catch (error) {
      throw new ApiError(401, "Invalid or expired token. Please login again.");
    }

    if (!decoded || !decoded._id || !decoded.role) {
      throw new ApiError(400, "Invalid token payload.");
    }

    const user = await User.findOne({ _id: decoded._id, role: decoded.role });

    if (!user) {
      throw new ApiError(
        404,
        `${decoded.role === "admin" ? "Admin" : "User"} not found or no longer exists. Please register or login again.`
      );
    }

    req.user = user;
    next();
  });

export const verifyJwtUserRefresh = verifyJwtRefresh("userRefreshToken");
export const verifyJwtAdminRefresh = verifyJwtRefresh("adminRefreshToken");

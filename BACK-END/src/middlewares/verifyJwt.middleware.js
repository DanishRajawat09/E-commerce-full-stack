import { JWT_ACCESSTOKEN_SECRET } from "../../config/env.js";
import { User } from "../models/user.models.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJwt = asyncHandler(async (req, res, next) => {
  const incomingToken =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!incomingToken) {
     throw new ApiError(401, "Authentication token is missing. Please login again.");
  }

  let decoded;
  try {
    decoded = jwt.verify(incomingToken, JWT_ACCESSTOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token. Please login again.");
  }

    if (!decoded || !decoded._id) {
    throw new ApiError(400, "Token decoded data is invalid.");
  }


  const user = await User.findById(decoded._id);

  if (!user) {
     throw new ApiError(404, "User not found. Please register or try logging in again.");
  }
  // console.log(user);

  req.user = user;

  next();
});

export default verifyJwt;

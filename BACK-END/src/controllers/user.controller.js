import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";
import {
  JWT_ACCESSTOKEN_EXPIRY,
  JWT_REFRESHTOKEN_EXPIRY,
  JWT_RESET_EXPIRY,
  JWT_RESET_SECRET,
  NODE_ENV,
} from "../../config/env.js";
import { responseFormat } from "../utils/basicUtils.js";
import jwt from "jsonwebtoken";
import ms from "ms";

const generateAccessRefreshToken = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(401, "unValid user id");
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  if (!accessToken || !refreshToken) {
    throw new ApiError(500, "Failed to generate tokens");
  }

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};
const registerUser = asyncHandler(async (req, res) => {
  const { email, contact, password } = req.body;

  if ([email, contact, password].some((val) => val.trim() === "")) {
    throw new ApiError(400, "sare field bharna zaroori hai");
  }

  const exsistingUser = await User.findOne({
    $and: [
      { $or: [{ email: email }, { contact: contact }] },
      { isVerified: true },
    ],
  });

  if (exsistingUser) {
    throw new ApiError(400, "user already exsisted");
  }

  const unVerifiedUser = await User.findOne({
    $and: [
      { $or: [{ email: email }, { contact: contact }] },
      { isVerified: false },
    ],
  });

  if (unVerifiedUser) {
    return res
      .status(200)
      ?.clearCookie("resetToken", {
        httpOnly: true,
        secure: NODE_ENV === "production",
      })
      .json(
        new ApiResponse(200, "user created successfully", {
          email: unVerifiedUser.email,
          contact: unVerifiedUser.contact,
        })
      );
  }

  const user = await User.create({
    email,
    password,
    contact,
  });

  if (!user) {
    throw new ApiError(500, "we cant create user database error");
  }

  res.status(200).json(
    new ApiResponse(200, "user created successfully", {
      email: user.email,
      contact: user.contact,
    })
  );
});
const afterSend = asyncHandler(async (req, res) => {
  const { _id, email } = req?.user;

  if (!_id || !email) {
    throw new ApiError(500, "after send otp getting id and email error");
  }
  const resetToken = jwt.sign({ id: _id, email: email }, JWT_RESET_SECRET, {
    expiresIn: JWT_RESET_EXPIRY,
  });

  if (!resetToken) {
    throw new ApiError(500, "jwt reset token issue");
  }

  const option = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    maxAge: ms(JWT_RESET_EXPIRY),
  };

  res
    .status(200)
    .cookie("resetToken", resetToken, option)
    .json(new ApiResponse(200, "otp send successfully", {}));
});

const afterVerify = asyncHandler(async (req, res) => {
  const user = req.user;

  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;
  await user.save({ validateBeforeSave: false });

  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    user._id
  );

  const userData = await responseFormat(user);

  const option = {
    httpOnly: true,
    secure: NODE_ENV === "production",
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...option,
      maxAge: ms(JWT_ACCESSTOKEN_EXPIRY),
    })
    .cookie("refreshToken", refreshToken, {
      ...option,
      maxAge: ms(JWT_REFRESHTOKEN_EXPIRY),
    })
    .clearCookie("resetToken", {
      httpOnly: true,
      secure: NODE_ENV === "production",
    })
    .json(
      new ApiResponse(200, "otp verified user created successfully", userData)
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, contact, password } = req.body;

  if (!email && !contact) {
    throw new ApiError(400, "Please provide either email or contact");
  }

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const user = await User.findOne({ $or: [{ email }, { contact }] });

  if (!user) {
    throw new ApiError(400, "user not found register first");
  }

  if (user.isVerified === false) {
    throw new ApiError(400, "user is not verified");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "incorrect password");
  }

  const userData = await responseFormat(user);

  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    user._id
  );
  const option = {
    httpOnly: true,
    secure: NODE_ENV === "production",
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...option,
      maxAge: ms(JWT_ACCESSTOKEN_EXPIRY),
    })
    .cookie("refreshToken", refreshToken, {
      ...option,
      maxAge: ms(JWT_REFRESHTOKEN_EXPIRY),
    })
    .json(new ApiResponse(200, "user logged in", userData));
});

const logoutUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  if (!_id) {
    throw new ApiError(400, "userId not found");
  }

  const user = await User.findByIdAndUpdate(_id, { refreshToken: null }).select(
    "-password -refreshToken -otp -otpExpiry"
  );

  if (!user) {
    throw new ApiError(400, "we cant nullish refresh token");
  }

  const option = {
    httpOnly: true,
    secure: NODE_ENV === "production",
  };

  res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, "user logout successfully", {}));
});

const handleForgotOtpSent = asyncHandler((req, res) => {
  const { _id, email } = req?.user;

  if (!_id || !email) {
    throw new ApiError(500, "after send otp getting id and email error");
  }
  const resetToken = jwt.sign({ id: _id, email: email }, JWT_RESET_SECRET, {
    expiresIn: JWT_RESET_EXPIRY,
  });

  if (!resetToken) {
    throw new ApiError(500, "jwt reset token issue");
  }

  const option = {
    httpOnly: true,
    secure: NODE_ENV === "production",
  };

  res
    .status(200)
    .cookie("resetToken", resetToken, option)
    .json(new ApiResponse(200, "otp send successfully", {}));
});

const handleForgotOtpVerified = asyncHandler(async (req, res) => {
  const user = req.user;

  user.otp = null;
  user.otpExpiry = null;
  await user.save({ validateBeforeSave: false });

  const token = await jwt.sign({ id: user._id }, JWT_RESET_SECRET, {
    expiresIn: JWT_RESET_EXPIRY,
  });

  if (!token) {
    throw new ApiError(500, "reset token error");
  }
  const option = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    maxAge: ms(JWT_RESET_EXPIRY),
  };

  res
    .status(200)
    .cookie("resetToken", token, option)
    .json(new ApiResponse(200, "reset token setup"));
});

const handleNewPasswordSet = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { newPassword } = req.body;
  if (!newPassword) {
    throw new ApiError(400, "new password is required");
  }
  if (!_id) {
    throw new ApiError(
      400,
      "something went wrong in enter new password otpAuth"
    );
  }

  const user = await User.findOne({ _id, authProvider: "local" });

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  if (!user) {
    throw new ApiError(500, "error while updating password ");
  }
  const option = {
    httpOnly: true,
    secure: NODE_ENV === "production",
  };

  res
    .status(200)
    .clearCookie("resetToken", option)
    .json(new ApiResponse(200, "password updated", {}));
});

export {
  registerUser,
  afterSend,
  afterVerify,
  loginUser,
  logoutUser,
  handleForgotOtpSent,
  handleForgotOtpVerified,
  handleNewPasswordSet,
};

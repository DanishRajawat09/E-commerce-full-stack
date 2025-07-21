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
import {
  resetTokenNameFunc,
  responseFormat,
  verifyTokenName,
} from "../utils/basicUtils.js";
import jwt from "jsonwebtoken";
import ms from "ms";
import { generateResetToken } from "../utils/resetToken.utils.js";

import cookieOption from "../utils/cookieOption.utils.js";
import generateAccessRefreshToken from "../utils/generateAccessRefresh.utils.js";

const checkResetToken = asyncHandler(async (req, res) => {
  const { purpose } = req.query;
  const token =
    req.cookies?.adminResetToken ||
    req.cookies?.userResetToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Reset token is missing or unauthorized access.");
  }
  if (!purpose) {
    throw new ApiError(400, "purpose is reuired");
  }
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_RESET_SECRET);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired reset token.");
  }

  if (!decoded || !decoded.id || !decoded.role) {
    throw new ApiError(401, "Invalid token payload.");
  }

  if (decoded.purpose !== purpose) {
    throw new ApiError(
      403,
      `Invalid token purpose. Expected '${decoded.purpose}', got '${purpose}'.`
    );
  }
  res
    .status(200)
    .json(new ApiResponse(200, "reset token is valid you can access", {}));
});

const getUserAdminInfo = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(400, "Unauthorized Request, login first");
  }

  const user = await User.findById(userId)
    .populate("address")
    .populate({
     path : "profile",
     select : "-_id -createdAt -updatedAt -__v -user"
    })
    .select(
      "-_id -adminProfile -__v -password -otp -otpExpiry -authProvider -role -isVerified -refreshToken -createdAt -updatedAt"
    )
    .lean();

  if (!user) {
    throw new ApiError(400, "User not Found, please register and try again");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "get user info successfully", user));
});

const registerUser = asyncHandler(async (req, res) => {
  let { email, contact, password, role } = req.body;

  // Normalize input
  email = email?.trim();
  contact = contact?.trim();
  password = password?.trim();
  role = role?.trim() || "user";

  // Basic validations
  if (!email && !contact) {
    throw new ApiError(400, "Email or contact number is required.");
  }

  if (!password || password.length < 6) {
    throw new ApiError(
      400,
      "Password must be a string and at least 6 characters long."
    );
  }

  // Check for verified existing user
  const existingUser = await User.findOne({
    $and: [{ $or: [{ email }, { contact }] }, { isVerified: true }],
  });

  if (existingUser) {
    throw new ApiError(
      400,
      `An account with this email or contact already exists for ${existingUser.role}. Please use different credentials.`
    );
  }

  const unverifiedUser = await User.findOne({
    $or: [{ email: email }, { contact: contact }],
    isVerified: false,
  });

  if (unverifiedUser) {
    const resetTokenName = await resetTokenNameFunc(unverifiedUser.role);
    return res
      .status(409)
      .clearCookie(resetTokenName, {
        httpOnly: true,
        secure: NODE_ENV === "production",
      })
      .json(
        new ApiResponse(
          409,
          "Account already exists but its not verified. Please complete verification.",
          {
            email: unverifiedUser.email,
            contact: unverifiedUser.contact,
          }
        )
      );
  }

  // Create new user
  const newUser = await User.create({
    email,
    contact,
    password,
    role,
  });

  if (!newUser) {
    throw new ApiError(
      500,
      "Something went wrong while creating the account. Please try again later."
    );
  }

  res.status(200).json(
    new ApiResponse(
      200,
      "Account created successfully. Please verify your account to continue.",
      {
        email: newUser.email,
        contact: newUser.contact,
        role: newUser.role,
      }
    )
  );
});

const afterSend = asyncHandler(async (req, res) => {
  const { _id, email, purpose, role } = req.user || {};

  if (!_id || !email) {
    throw new ApiError(
      500,
      "Unable to retrieve user information for OTP process. Please try again."
    );
  }

  const resetToken = await generateResetToken({ _id, email, purpose, role });

  const resetTokenName = await resetTokenNameFunc(role);
  const cookieOptions = cookieOption(ms(JWT_RESET_EXPIRY));
  res
    .status(200)
    .cookie(resetTokenName, resetToken, cookieOptions)
    .json(new ApiResponse(200, "OTP sent successfully on", { email }));
});

const afterVerify = asyncHandler(async (req, res) => {
  const user = req.user || {};

  if (!user._id) {
    throw new ApiError(401, "User not found during OTP verification.");
  }

  user.otp = null;
  user.otpExpiry = null;
  await user.save({ validateBeforeSave: false });

  const { accessToken, refreshToken, accessTokenName, refreshTokenName } =
    await generateAccessRefreshToken(user._id);

  if (!accessToken || !refreshToken || !accessTokenName || !refreshTokenName) {
    throw new ApiError(
      500,
      "Failed to generate authentication tokens. Please try logging in again."
    );
  }
  const resetTokenName = await resetTokenNameFunc(user.role);
  let excludedKeys = [
    "_id",
    "__v",
    "createdAt",
    "updatedAt",
    "address",
    "profile",
    "adminProfile",
    "otp",
    "otpExpiry",
    "refreshToken",
    "password",
  ];
  const formatedResponse = await responseFormat(user, excludedKeys);

  const resetCookieOptions = cookieOption(ms(JWT_RESET_EXPIRY));
  const accessCookieOptions = cookieOption(ms(JWT_ACCESSTOKEN_EXPIRY));
  const refreshCookieOptions = cookieOption(ms(JWT_REFRESHTOKEN_EXPIRY));
  res
    .status(200)
    .cookie(accessTokenName, accessToken, accessCookieOptions)
    .cookie(refreshTokenName, refreshToken, refreshCookieOptions)
    .clearCookie(resetTokenName, resetCookieOptions)
    .json(
      new ApiResponse(
        200,
        "OTP verified. Account created and signed in successfully.",
        formatedResponse
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { emailContact, password, role } = req.body;

  if (!emailContact) {
    throw new ApiError(
      400,
      "Please provide either an email or contact number to log in."
    );
  }

  if (!password) {
    throw new ApiError(400, "Password is required to log in.");
  }

  const user = await User.findOne({
    $and: [
      { $or: [{ email: emailContact }, { contact: emailContact }] },
      { role: role || "user" },
    ],
  });

  if (!user) {
    throw new ApiError(
      400,
      "No account found for the provided email or contact number."
    );
  }

  if (user.isVerified === false) {
    throw new ApiError(
      400,
      "Your account is not verified yet. Please complete OTP verification."
    );
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(
      400,
      "Incorrect password. Please try again or reset it if you've forgotten."
    );
  }

  let excludedKeys = [
    "_id",
    "__v",
    "createdAt",
    "updatedAt",
    "address",
    "profile",
    "adminProfile",
    "otp",
    "otpExpiry",
    "refreshToken",
    "password",
  ];
  const formatedResponse = await responseFormat(user, excludedKeys);

  const { accessToken, refreshToken, accessTokenName, refreshTokenName } =
    await generateAccessRefreshToken(user._id);
  const accessCookieOptions = cookieOption(ms(JWT_ACCESSTOKEN_EXPIRY));
  const refreshCookieOptions = cookieOption(ms(JWT_REFRESHTOKEN_EXPIRY));

  res
    .status(200)
    .cookie(accessTokenName, accessToken, accessCookieOptions)
    .cookie(refreshTokenName, refreshToken, refreshCookieOptions)
    .json(
      new ApiResponse(
        200,
        "Welcome back! You’re now logged in.",
        formatedResponse
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const { _id, role } = req.user;

  if (!_id) {
    throw new ApiError(400, "Missing user ID in request. Cannot logout.");
  }

  const user = await User.findByIdAndUpdate(
    _id,
    { refreshToken: null },
    { new: true }
  ).select("-password -refreshToken -otp -otpExpiry");

  if (!user) {
    throw new ApiError(400, "User not found or logout failed.");
  }

  const { verifyAccessTokenName, verifyRefreshTokenName } =
    await verifyTokenName(role);
  const accessCookieOptions = cookieOption(ms(JWT_ACCESSTOKEN_EXPIRY));
  const refreshCookieOptions = cookieOption(ms(JWT_REFRESHTOKEN_EXPIRY));
  res
    .status(200)
    .clearCookie(verifyAccessTokenName, accessCookieOptions)
    .clearCookie(verifyRefreshTokenName, refreshCookieOptions)
    .json(
      new ApiResponse(200, "Logout successful. You have been signed out.", {})
    );
});

const handleForgotOtpSent = asyncHandler(async (req, res) => {
  const { _id, email, purpose, role } = req?.user?.toObject?.() || req.user;

  if (!_id || !email) {
    throw new ApiError(
      500,
      "Missing user ID or email in request. Cannot send OTP."
    );
  }
  if (!purpose) {
    throw new ApiError(
      400,
      "OTP purpose is missing. Cannot generate reset token."
    );
  }

  const resetToken = await generateResetToken({ _id, email, purpose, role });

  const resetTokenName = await resetTokenNameFunc(role);
  const resetCookieOptions = cookieOption(ms(JWT_RESET_EXPIRY));
  res
    .status(200)
    .cookie(resetTokenName, resetToken, resetCookieOptions)
    .json(
      new ApiResponse(
        200,
        "OTP sent successfully. Please check your email or SMS.",
        {}
      )
    );
});

const handleForgotOtpVerified = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(
      401,
      "User not found. Please ensure OTP verification was completed properly."
    );
  }
  const role = user.role;

  const purpose =
    role === "user" ? "resetPasswordVerify" : "resetAdminPasswordVerify";

  user.otp = null;
  user.otpExpiry = null;
  await user.save({ validateBeforeSave: false });

  const resetToken = await generateResetToken({ ...user.toObject(), purpose });

  const resetTokenName = await resetTokenNameFunc(user.toObject().role);
  const resetCookieOptions = cookieOption(ms(JWT_RESET_EXPIRY));
  res
    .status(200)
    .cookie(resetTokenName, resetToken, resetCookieOptions)
    .json(new ApiResponse(200, "OTP verified successfully. Reset token set."));
});

const handleNewPasswordSet = asyncHandler(async (req, res) => {
  const { _id, role } = req.user;
  const { newPassword } = req.body;

  if (!_id) {
    throw new ApiError(401, "Unauthorized request. User ID missing.");
  }

  if (
    !newPassword ||
    typeof newPassword !== "string" ||
    newPassword.trim().length < 6
  ) {
    throw new ApiError(
      400,
      "New password is required and must be at least 6 characters long."
    );
  }

  const user = await User.findOne({ _id, authProvider: "local", role });

  if (!user) {
    throw new ApiError(
      404,
      "Unable to update password. User not found or using external login method."
    );
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  const resetTokenName = await resetTokenNameFunc(role);
  const resetCookieOptions = cookieOption(ms(JWT_RESET_EXPIRY), "strict");
  res
    .status(200)
    .clearCookie(resetTokenName, resetCookieOptions)
    .json(new ApiResponse(200, "Password has been successfully updated.", {}));
});

const handleEmailResetSendOtp = asyncHandler(async (req, res) => {
  const { _id, email, purpose, role } = req?.user;

  if (!_id || !email) {
    throw new ApiError(
      500,
      "Failed to retrieve user ID or email to generate reset token."
    );
  }
  const resetToken = await generateResetToken({ _id, email, purpose, role });

  const resetCookieOptions = cookieOption(ms(JWT_RESET_EXPIRY));

  const resetTokenName = await resetTokenNameFunc(role);
  res
    .status(200)
    .cookie(resetTokenName, resetToken, resetCookieOptions)
    .json(
      new ApiResponse(
        200,
        "OTP sent successfully. Please check your email or SMS.",
        {}
      )
    );
});
const handleEmailResetVerifyOtp = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(401, "User not found during email reset verification.");
  }

  user.otp = null;
  user.otpExpiry = null;
  await user.save({ validateBeforeSave: false });
  const purpose =
    user.role === "user" ? "resetEmailVerify" : "resetAdminEmailVerify";

  const resetToken = await generateResetToken({ ...user.toObject(), purpose });

  const resetTokenName = await resetTokenNameFunc(user.role);
  const resetCookieOptions = cookieOption(ms(JWT_RESET_EXPIRY));
  res
    .status(200)
    .cookie(resetTokenName, resetToken, resetCookieOptions)
    .json(new ApiResponse(200, "OTP verified successfully. Reset token set."));
});

const handleNewEmailSet = asyncHandler(async (req, res) => {
  const { newEmail } = req.body;

  if (!newEmail) {
    throw new ApiError(400, "Please enter a new email address.");
  }

  const user = req.user;

  if (!user) {
    throw new ApiError(401, "Unauthorized request. Please try again.");
  }

  if (user.email === newEmail) {
    throw new ApiError(
      400,
      "New email must be different from the current one."
    );
  }
  const existingEmail = await User.findOne({ email: newEmail });

  if (existingEmail) {
    throw new ApiError(
      400,
      `email already exist for ${existingEmail.role} try again`
    );
  }

  const updatedUser = await User.findByIdAndUpdate(
    { _id: user._id, role: user.role },
    { email: newEmail },
    { new: true }
  );

  if (!updatedUser) {
    throw new ApiError(404, "User not found or unauthorized request.");
  }

  const resetTokenName = await resetTokenNameFunc(user.role);
  const resetCookieOptions = cookieOption(ms(JWT_RESET_EXPIRY), "strict");

  res
    .status(200)
    .clearCookie(resetTokenName, resetCookieOptions)
    .json(
      new ApiResponse(200, "Email updated successfully.", updatedUser.email)
    );
});

const handleContactResetSendOtp = asyncHandler(async (req, res) => {
  const { _id, email, purpose, role } = req?.user;

  if (!_id || !email) {
    throw new ApiError(
      500,
      "Unable to retrieve user ID or email for contact reset."
    );
  }

  const resetToken = await generateResetToken({ _id, email, purpose, role });

  const resetTokenName = await resetTokenNameFunc(role);
  const resetCookieOptions = cookieOption(ms(JWT_RESET_EXPIRY));

  res
    .status(200)
    .cookie(resetTokenName, resetToken, resetCookieOptions)
    .json(
      new ApiResponse(
        200,
        "OTP sent successfully. Please check your registered contact method.",
        {}
      )
    );
});

const handleContactResetVerifyOtp = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(401, "Unauthorized request. User not found.");
  }

  user.otp = null;
  user.otpExpiry = null;
  await user.save({ validateBeforeSave: false });

  const purpose =
    user.role === "user" ? "resetContactVerify" : "resetAdminContactVerify";

  const resetToken = await generateResetToken({ ...user.toObject(), purpose });

  const resetCookieOptions = cookieOption(ms(JWT_RESET_EXPIRY));
  const resetTokenName = await resetTokenNameFunc(user.role);
  res
    .status(200)
    .cookie(resetTokenName, resetToken, resetCookieOptions)
    .json(new ApiResponse(200, "OTP verified successfully. Reset token set."));
});

const handleNewContactSet = asyncHandler(async (req, res) => {
  const { newContact } = req.body;

  if (!newContact) {
    throw new ApiError(400, "Please enter your new contact number.");
  }

  const user = req.user;

  if (!user) {
    throw new ApiError(401, "Unauthorized request. Please try again.");
  }

  // Optional: Prevent setting the same contact again
  if (user.contact === newContact) {
    throw new ApiError(400, "This is already your current contact number.");
  }

  const exsistingContact = await User.findOne({ contact: newContact });

  if (exsistingContact) {
    throw new ApiError(
      400,
      "Contact already exist for " + exsistingContact.role + " try again"
    );
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id, role: user.role },
    { contact: newContact },
    { new: true }
  );

  if (!updatedUser) {
    throw new ApiError(404, "User not found or unauthorized request.");
  }

  const resetTokenName = await resetTokenNameFunc(user.role);
  const resetCookieOptions = cookieOption(ms(JWT_RESET_EXPIRY), "strict");

  res
    .status(200)
    .clearCookie(resetTokenName, resetCookieOptions)
    .json(
      new ApiResponse(
        200,
        "Contact number updated successfully.",
        updatedUser.contact
      )
    );
});

const handleUpdateAccessToken = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user._id || !user.refreshToken) {
    throw new ApiError(400, "User id or token not found, login again");
  }
  const userData = await User.findOne({
    _id: user._id,
    refreshToken: user.refreshToken,
    role: user.role,
  });

  if (!userData) {
    throw new ApiError(
      401,
      "Invalid or expired refresh token. Please login again."
    );
  }

  const { accessToken, accessTokenName, refreshToken, refreshTokenName } =
    await generateAccessRefreshToken(user._id);

  if (
    [accessToken, accessTokenName, refreshToken, refreshTokenName].some(
      (val) => !val
    )
  ) {
    throw new ApiError(500, "Error generating access and refresh tokens.");
  }

  const accessCookieOptions = cookieOption(ms(JWT_ACCESSTOKEN_EXPIRY));
  const refreshCookieOptions = cookieOption(ms(JWT_REFRESHTOKEN_EXPIRY));

  res
    .status(200)
    .cookie(accessTokenName, accessToken, accessCookieOptions)
    .cookie(refreshTokenName, refreshToken, refreshCookieOptions)
    .json(new ApiResponse(200, "access token updated", {}));
});

export {
  registerUser,
  afterSend,
  afterVerify,
  loginUser,
  logoutUser,
  getUserAdminInfo,
  handleForgotOtpSent,
  handleForgotOtpVerified,
  handleNewPasswordSet,
  handleEmailResetSendOtp,
  handleEmailResetVerifyOtp,
  handleNewEmailSet,
  handleContactResetSendOtp,
  handleContactResetVerifyOtp,
  handleNewContactSet,
  handleUpdateAccessToken,
  checkResetToken,
};

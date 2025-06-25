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
    throw new ApiError(401, "inValid user id");
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
    throw new ApiError(
      400,
      "Email, contact number, and password are required."
    );
  }

  if (!password || typeof password !== "string" || password.trim().length < 6) {
    throw new ApiError(
      400,
      "Password is required and must be at least 6 characters long."
    );
  }

  const exsistingUser = await User.findOne({
    $and: [
      { $or: [{ email: email }, { contact: contact }] },
      { isVerified: true },
    ],
  });

  if (exsistingUser) {
    throw new ApiError(
      400,
      "An account with this email or contact number already exists and is verified."
    );
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
        new ApiResponse(
          200,
          "Account already exists but not verified. Please verify to continue.",
          {
            email: unVerifiedUser.email,
            contact: unVerifiedUser.contact,
          }
        )
      );
  }

  const user = await User.create({
    email,
    password,
    contact,
  });

  if (!user) {
    throw new ApiError(
      500,
      "Failed to create account due to a server error. Please try again."
    );
  }

  res.status(200).json(
    new ApiResponse(
      200,
      "Account created successfully. Please verify your account to continue.",
      {
        email: user.email,
        contact: user.contact,
      }
    )
  );
});
const afterSend = asyncHandler(async (req, res) => {
  const { _id, email, purpose } = req?.user;

  if (!_id || !email) {
    throw new ApiError(
      500,
      "Unable to retrieve user information for OTP process. Please try again."
    );
  }
  const resetToken = jwt.sign(
    { id: _id, email: email, purpose },
    JWT_RESET_SECRET,
    {
      expiresIn: JWT_RESET_EXPIRY,
    }
  );

  if (!resetToken) {
    throw new ApiError(
      500,
      "An error occurred while generating the reset token. Please try again later."
    );
  }

  const option = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    maxAge: ms(JWT_RESET_EXPIRY),
  };

  res
    .status(200)
    .cookie("resetToken", resetToken, option)
    .json(new ApiResponse(200, "OTP sent successfully", {}));
});

const afterVerify = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(401, "User not found during OTP verification.");
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;
  await user.save({ validateBeforeSave: false });

  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    user._id
  );

  if (!accessToken || !refreshToken) {
    throw new ApiError(
      500,
      "Failed to generate authentication tokens. Please try logging in again."
    );
  }

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
      new ApiResponse(
        200,
        "OTP verified. Account created and signed in successfully.",
        userData
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, contact, password } = req.body;

  if (!email && !contact) {
    throw new ApiError(
      400,
      "Please provide either an email or contact number to log in."
    );
  }

  if (!password) {
    throw new ApiError(400, "Password is required to log in.");
  }

  const user = await User.findOne({ $or: [{ email }, { contact }] });

  if (!user) {
    throw new ApiError(
      400,
      "No account found with the provided credentials. Please register first."
    );
  }

  if (user.isVerified === false) {
    throw new ApiError(
      400,
      "Your account is not verified yet. Please complete OTP verification."
    );
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(
      400,
      "The password you entered is incorrect. Please try again."
    );
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
    .json(
      new ApiResponse(200, "Welcome back! You’re now logged in.", userData)
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  if (!_id) {
    throw new ApiError(400, "User ID is missing in the request.");
  }

  const user = await User.findByIdAndUpdate(_id, { refreshToken: null }).select(
    "-password -refreshToken -otp -otpExpiry"
  );

  if (!user) {
    throw new ApiError(400, "User not found or unable to clear access token.");
  }

  const option = {
    httpOnly: true,
    secure: NODE_ENV === "production",
  };

  res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(
      new ApiResponse(200, "Logout successful. You have been signed out.", {})
    );
});

const handleForgotOtpSent = asyncHandler((req, res) => {
  const { _id, email, purpose } = req?.user?.toObject?.() || req.user;

  if (!_id || !email) {
    throw new ApiError(500, "Failed to retrieve user ID or email.");
  }

  let resetToken;
  try {
    resetToken = jwt.sign({ id: _id, email, purpose }, JWT_RESET_SECRET, {
      expiresIn: JWT_RESET_EXPIRY,
    });
  } catch (err) {
    throw new ApiError(500, "Unable to generate reset token.");
  }

  res
    .status(200)
    .cookie("resetToken", resetToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: ms(JWT_RESET_EXPIRY),
    })
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
    throw new ApiError(401, "Unauthorized request. User not found.");
  }

  user.otp = null;
  user.otpExpiry = null;
  await user.save({ validateBeforeSave: false });

  let token;
  try {
    token = jwt.sign(
      { id: user._id, purpose: "resetPassword" },
      JWT_RESET_SECRET,
      { expiresIn: JWT_RESET_EXPIRY }
    );
  } catch (err) {
    throw new ApiError(500, "JWT generation failed.");
  }
  const option = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    maxAge: ms(JWT_RESET_EXPIRY),
  };

  res
    .status(200)
    .cookie("resetToken", token, option)
    .json(new ApiResponse(200, "OTP verified successfully. Reset token set."));
});

const handleNewPasswordSet = asyncHandler(async (req, res) => {
  const { _id } = req.user;
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

  const user = await User.findOne({ _id, authProvider: "local" });

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  if (!user) {
    throw new ApiError(
      404,
      "User not found or invalid authentication provider."
    );
  }
  const option = {
    httpOnly: true,
    secure: NODE_ENV === "production",
  };

  res
    .status(200)
    .clearCookie("resetToken", option)
    .json(new ApiResponse(200, "Password has been successfully updated.", {}));
});

const handleEmailResetSendOtp = asyncHandler(async (req, res) => {
  const { _id, email, purpose } = req?.user;

  if (!_id || !email) {
    throw new ApiError(
      500,
      "Failed to retrieve user ID or email after sending OTP."
    );
  }
  const resetToken = jwt.sign(
    { id: _id, email: email, purpose: purpose },
    JWT_RESET_SECRET,
    {
      expiresIn: JWT_RESET_EXPIRY,
    }
  );

  if (!resetToken) {
    throw new ApiError(500, "Unable to generate password reset token.");
  }

  const option = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    maxAge: ms(JWT_RESET_EXPIRY),
  };

  res
    .status(200)
    .cookie("resetToken", resetToken, option)
    .json(
      new ApiResponse(
        200,
        "OTP sent successfully. Please check your email or SMS.",
        {}
      )
    );
});
const hanldeEmailResetVerifyOtp = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(401, "Unauthorized request. User not found.");
  }

  user.otp = null;
  user.otpExpiry = null;
  await user.save({ validateBeforeSave: false });

  const token = await jwt.sign(
    { id: user._id, purpose: "resetEmail" },
    JWT_RESET_SECRET,
    {
      expiresIn: JWT_RESET_EXPIRY,
    }
  );

  if (!token) {
    throw new ApiError(500, "Failed to generate password reset token.");
  }
  const option = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    maxAge: ms(JWT_RESET_EXPIRY),
  };

  res
    .status(200)
    .cookie("resetToken", token, option)
    .json(new ApiResponse(200, "OTP verified successfully. Reset token set."));
});

const handleNewEmailSet = asyncHandler(async (req, res) => {
  const { newEmail } = req.body;

  if (!newEmail) {
    throw new ApiError(400, "Enter your new Email");
  }

  const user = req.user;

  if (!user) {
    throw new ApiError(400, "Unauthorized Request please try again");
  }

  if (user.email === newEmail) {
    throw new ApiError(400, "Enter new Email. ");
  }

  const userdata = await User.findByIdAndUpdate(
    { _id: user._id },
    { email: newEmail },
    { new: true }
  );
  if (!userdata) {
    throw new ApiError(500, "User not found. or Unauthorized Request");
  }

  const option = {
    httpOnly: true,
    secure: NODE_ENV === "production",
  };

  res
    .status(200)
    .clearCookie("resetCookie", option)
    .json(new ApiResponse(200, "Email Updated SuccessFull", userdata.email));
});

const handleContactResetSendOtp = asyncHandler(async (req, res) => {
  const { _id, email, purpose } = req?.user;

  if (!_id || !email) {
    throw new ApiError(
      500,
      "Failed to retrieve user ID or email after sending OTP."
    );
  }
  const resetToken = jwt.sign(
    { id: _id, email: email, purpose },
    JWT_RESET_SECRET,
    {
      expiresIn: JWT_RESET_EXPIRY,
    }
  );

  if (!resetToken) {
    throw new ApiError(500, "Unable to generate password reset token.");
  }

  const option = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    maxAge: ms(JWT_RESET_EXPIRY),
  };

  res
    .status(200)
    .cookie("resetToken", resetToken, option)
    .json(
      new ApiResponse(
        200,
        "OTP sent successfully. Please check your email or SMS.",
        {}
      )
    );
});

const hanldeContactResetVerifyOtp = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(401, "Unauthorized request. User not found.");
  }

  user.otp = null;
  user.otpExpiry = null;
  await user.save({ validateBeforeSave: false });

  const token = await jwt.sign(
    { id: user._id, purpose: "resetContact" },
    JWT_RESET_SECRET,
    {
      expiresIn: JWT_RESET_EXPIRY,
    }
  );

  if (!token) {
    throw new ApiError(500, "Failed to generate password reset token.");
  }
  const option = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    maxAge: ms(JWT_RESET_EXPIRY),
  };

  res
    .status(200)
    .cookie("resetToken", token, option)
    .json(new ApiResponse(200, "OTP verified successfully. Reset token set."));
});

const handleNewContactSet = asyncHandler(async (req, res) => {
  const { newContact } = req.body;

  if (!newContact) {
    throw new ApiError(400, "Enter your new Contact");
  }

  const user = req.user;

  if (!user) {
    throw new ApiError(400, "Unauthorized Request please try again");
  }

  // if (user.email === newEmail) {
  //   throw new ApiError(400, "Enter new Email. ");
  // }

  const userdata = await User.findByIdAndUpdate(
    { _id: user._id },
    { contact: newContact },
    { new: true }
  );
  if (!userdata) {
    throw new ApiError(500, "User not found. or Unauthorized Request");
  }

  const option = {
    httpOnly: true,
    secure: NODE_ENV === "production",
  };

  res
    .status(200)
    .clearCookie("resetCookie", option)
    .json(new ApiResponse(200, "Email Updated SuccessFull", userdata.contact));
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
  handleEmailResetSendOtp,
  hanldeEmailResetVerifyOtp,
  handleNewEmailSet,
  handleContactResetSendOtp,
  hanldeContactResetVerifyOtp,
  handleNewContactSet,
};

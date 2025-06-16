import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";
import cookie from "cookie-parser";
import { NODE_ENV } from "../../config/env.js";
import bcrypt from "bcrypt";
const generateOtp = () => {
  let otp = "";

  for (let i = 0; i < 6; i++) {
    const randomVal = Math.floor(Math.random() * 10);

    otp += randomVal;
  }
  const expiry = new Date(Date.now() + 5 * 60 * 1000);

  return { otp, expiry };
};
const generateAccessRefreshToken = async (id) => {
  const user = await User.findById(id);

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

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
    $or: [{ email: email }, { contact: contact }],
  });

  if (exsistingUser) {
    throw new ApiError(400, "user already exsisted");
  }

  const user = await User.create({
    email: email,
    password: password,
    contact: contact,
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
const sendOtp = asyncHandler(async (req, res) => {
  const { contact, email } = req.body;

  if (!contact && !email) throw new ApiError(400, "atlest select one option");

  const { otp, expiry } = generateOtp();

  const user = await User.findOneAndUpdate(
    { $or: [{ email: email }, { contact: contact }] },
    {
      otp: otp,
      otpExpiry: expiry,
    }
  );

  if (!user) {
    throw new ApiError(500, "database error while setting otp");
  }

  if (email) {
    console.log("otp send on email", otp);
  }
  if (contact) {
    console.log("otp send on contact", otp);
  }

  res
    .status(200)
    .json(new ApiResponse(200, "otp sent succesfully", { id: user._id }));
});

const verifyOtp = asyncHandler(async (req, res) => {
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

  if (isOtp) {
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save({ validateBeforeSave: false });
  }

  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    user._id
  );

  const option = {
    httpOnly: true,
    secure: NODE_ENV === "production",
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(new ApiResponse(200, "otp verified user created successfully", user));
});

export { registerUser, sendOtp, verifyOtp };

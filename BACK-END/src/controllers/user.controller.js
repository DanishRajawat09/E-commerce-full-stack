import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";

import { NODE_ENV } from "../../config/env.js";
import bcrypt from "bcrypt";
import { responseFormat } from "../utils/besicUtils.js";


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
  const userId = req.user._id
    res
    .status(200)
    .json(new ApiResponse(200, "otp sent succesfully",userId));
})

const afterVerify = asyncHandler(async (req, res) => {
 const user = req.user

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save({ validateBeforeSave: false });


  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    user._id
  );

  const userData = await responseFormat(user)

  const option = {
    httpOnly: true,
    secure: NODE_ENV === "production",
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(new ApiResponse(200, "otp verified user created successfully", userData));
});


const loginUser = asyncHandler(async (req, res) => {
 const {email , contact , password} = req.body

if (!email && !contact) {
  throw new ApiError(400, "Please provide either email or contact");
}

if (!password) {
  throw new ApiError(400, "Password is required");
}

const user = await User.findOne({$or :[{email} , {contact}]})

if (!user) {
  throw new ApiError(400 , "user not found register first")
}

const isPasswordCorrect =  await user.isPasswordCorrect(password)

if (!isPasswordCorrect) {
  throw new ApiError(400 , "incorrect password")
}

user.isVerified = true
await user.save({validateBeforeSave : false})


const userData = await responseFormat(user)


const {accessToken , refreshToken} = await generateAccessRefreshToken(user._id)
const option = {
  httpOnly : true,
secure : NODE_ENV === "production"
}



res.status(200).cookie("accessToken" , accessToken ,option ).cookie("refreshToken" , refreshToken ,option).json(
  new ApiResponse(200 , "user logged in" ,userData )
)


})

const logoutUser = asyncHandler(async (req ,res) => {
  const {_id} = req.user

  if (!_id) {
    throw new ApiError(400 , "userId not found")
  }

  const user = await User.findByIdAndUpdate(_id , {refreshToken : null , isVerified : false}).select("-password -refreshToken -otp -otpExpiry")

  if (!user) {
 throw new ApiError(400 , "we cant nullish refresh token")   
  }

  const option = {
    httpOnly : true,
    secure : NODE_ENV === "production"
  }

  res.status(200).clearCookie("accessToken" , option).clearCookie("refreshToken" , option).json(
    new ApiResponse(200 , "user logout successfully" ,{})
  )



})

export { registerUser, afterSend, afterVerify, loginUser , logoutUser};

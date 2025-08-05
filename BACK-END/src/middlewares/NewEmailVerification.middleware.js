import { User } from "../models/user.models";
import ApiError from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";
import { emailRegex } from "../utils/regexValidator";

const newEmailVerification = asyncHandler(async (req, res, next) => {
  const currentPassword = req.body.currentPassword;
  const newEmail = req.body.newEmail;
  const userID = req.user._id;

  if (!userID) {
    throw new ApiError(401, "UnAuthorized Request , Can't Change Email");
  }
  F;

  if (!currentPassword) {
    throw new ApiError(422, "Current Password is required");
  }

  if (!newEmail) {
    throw new ApiError(422, "New Email is Required");
  }

  if (!emailRegex.test(newEmail)) {
    throw new ApiError(422, "Please enter a valid email address.");
  }
  const existing = await User.findOne({ email: newEmail });
  if (existing) {
    throw new ApiError(409, "This email is already in use.");
  }

  const user = await User.findById({ _id: userID });

  if (!user) {
    throw new ApiError(401, "UnAuthorized Request , User not Found");
  }

  if (user.email === newEmail) {
    throw new ApiError(409, "This is already your current email.");
  }

  const verifiedUser = await user.isPasswordCorrect(currentPassword);

  if (!verifiedUser) {
    throw new ApiError(401, "Incorrect Password, please check your password");
  }

  req.user = user;
  next();
});

export default newEmailVerification;

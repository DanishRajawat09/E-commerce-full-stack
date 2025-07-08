import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { deleteFile, uploadImage } from "../utils/cloudinary.js";
import { Profile } from "../models/profile.models.js";
import ApiResponse from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";
const createProfile = asyncHandler(async (req, res) => {
  const { fullName } = req.body;
  const user = req.user;
  if (!fullName) {
    throw new ApiError(400, "Full name is required.");
  }
  if (!user) {
    throw new ApiError(400, "User not found invalid token");
  }

  const filePath = req.file?.path;

  if (!filePath) {
    throw new ApiError(400, "avatar not found upload again");
  }
  const avatarUpload = await uploadImage(filePath);

  if (!avatarUpload) {
    throw new ApiError(400, "Failed to upload avatar. Please try again.");
  }

  const profile = await Profile.create({
    fullName,
    avatar: {
      url: avatarUpload.url,
      publicId: avatarUpload.public_id,
    },
    user: user._id,
  });

  if (!profile) {
    throw new ApiError(
      500,
      "We could not create the profile. Please try again."
    );
  }
  const userData = await User.findByIdAndUpdate(
    { _id: user._id },
    { profile: profile._id },
    { new: true }
  );
  if (!userData) {
    throw new ApiError(400, "Unauthorized Request , please register first");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "profile created succssfully", profile));
});

const updateFullName = asyncHandler(async (req, res) => {
  const { fullName } = req.body;
  const user = req.user;
  if (!fullName) {
    throw new ApiError(400, "full name is required");
  }
  if (!user) {
    throw new ApiError(400, "Unauthorized user. Please log in again.");
  }

  const exsistingProfile = await Profile.findOne({ user: user._id });

  if (!exsistingProfile) {
    throw new ApiError(400, "Profile does not exist. Please create one first.");
  }

  const profile = await Profile.findOneAndUpdate(
    { user: user._id },
    { fullName },
    { new: true }
  );

  if (!profile) {
    throw new ApiError(
      400,
      "Profile not found. Please create a profile first."
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "fullname updated successfully", profile));
});

const updateAvatar = asyncHandler(async (req, res) => {
  const filePath = req.file?.path;
  const user = req.user;

  if (!filePath) {
    throw new ApiError(400, "Avatar file is required.");
  }
  if (!user) {
    throw new ApiError(400, "Unauthorized request. Please log in again.");
  }

  const profile = await Profile.findOne({ user: user._id });

  if (!profile) {
    throw new ApiError(500, "profile not found");
  }

  const deletefile = await deleteFile(profile.toObject().avatar.publicId);

  if (!deletefile) {
    throw new ApiError(
      500,
      "Error occurred while deleting the previous avatar."
    );
  }

  const avatar = await uploadImage(filePath);

  if (!avatar) {
    throw new ApiError(400, "error while uploading files");
  }

  profile.avatar.url = avatar.url;
  profile.avatar.publicId = avatar.public_id;
  await profile.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, "avatar updated successfully", profile));
});
export { createProfile, updateFullName, updateAvatar };

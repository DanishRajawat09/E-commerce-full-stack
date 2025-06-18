import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { deleteFile, uploadImage } from "../utils/cloudinary.js";
import { Profile } from "../models/profile.models.js";
import ApiResponse from "../utils/apiResponse.js";
const createProfile = asyncHandler(async (req, res) => {
  const { fullName } = req.body;
  const user = req.user;
  if (!fullName) {
    throw new ApiError(400, "fullname is required");
  }
  if (!user) {
    throw new ApiError(400, "User not found invalid token");
  }

  const filePath = req.file?.path;

  if (!filePath) {
    throw new ApiError(400, "avatar not found upload again");
  }
  const result = await uploadImage(filePath);

  if (!result) {
    throw new ApiError(400, "avatar not upload properly");
  }

  const profile = await Profile.create({
    fullName,
    avatar: {
      url: result.url,
      publicId: result.public_id,
    },
    user: user._id,
  });

  if (!profile) {
    throw new ApiError(
      500,
      "we could not create profile. something went wrong try again"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "profile created succssfully", profile));
});

const updateFullName = asyncHandler(async (req, res) => {
  const { fullName } = req.body;
  const user = req.user;

  if (!fullName) {
    throw new ApiError(400, "fullname is required");
  }
  if (!user) {
    throw new ApiError(400, "Unauthorized user, login again");
  }

  const exsistingProfile = await Profile.findOne({ user: user._id });

  if (!exsistingProfile) {
    throw new ApiError(400, "Profile already exsist. you can update only");
  }

  const profile = await Profile.findOneAndUpdate(
    { user: user._id },
    { fullName },
    { new: true }
  );

  if (!profile) {
    throw new ApiError(400, "Profile not found create an profile first");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "fullname updated successfully", profile));
});

const updateAvatar = asyncHandler(async (req, res) => {
  const filePath = req.file?.path;
  const user = req.user;

  if (!filePath) {
    throw new ApiError(400, "avatar is required");
  }
  if (!user) {
    throw new ApiError(400, "User is not properly login");
  }

  const profile = await Profile.findOne({ user: user._id });

  if (!profile) {
    throw new ApiError(500, "profile not found");
  }

  const deletefile = await deleteFile(profile.toObject().avatar.publicId);

  if (!deletefile) {
    throw new ApiError(500, "deleting previuos avatar causing error");
  }

  const avatar = await uploadImage(filePath);

  if (!avatar) {
    throw new ApiError(400, "error while uploading files");
  }

  profile.avatar.url = avatar.url;
  profile.avatar.publicId = avatar.public_id;
  profile.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(new ApiResponse(200, "avatar updated successfully", profile));
});
export { createProfile, updateFullName, updateAvatar };

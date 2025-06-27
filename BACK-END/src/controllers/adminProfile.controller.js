import { AdminProfile } from "../models/adminProfile.models.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const role = req.user.role;

  if (!userId || role !== "admin") {
    throw new ApiError(403, "Only admins are allowed to create a profile.");
  }

  const { shopName } = req.body;

  if (!shopName || typeof shopName !== "string" || shopName.trim() === "") {
    throw new ApiError(400, "Shop name is required.");
  }

  const existingProfile = await AdminProfile.findOne({ admin: userId });
  if (existingProfile) {
    throw new ApiError(400, "Admin profile already exists.");
  }

  const adminProfile = await AdminProfile.create({
    admin: userId,
    shopName: shopName.trim(),
  });

  if (!adminProfile) {
    throw new ApiError(500, "Error while creating admin profile.");
  }

  res
    .status(201)
    .json(new ApiResponse(201, "Shop name added successfully", adminProfile));
});

export { createProfile };

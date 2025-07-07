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
const updateShopName = asyncHandler(async (req, res) => {
  const { shopName, pinCode, city, state, address } = req.body;
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(400, "Unauthorized Request, Login please");
  }
  const adminProfile = await AdminProfile.findOne({ admin: userId }).populate(
    "shopAddress"
  );

  if (!adminProfile) {
    throw new ApiError(
      401,
      "Unauthorized request. Please login or register first."
    );
  }
  if (!adminProfile.shopAddress) {
    throw new ApiError(500, "Shop address not found for this admin profile.");
  }

  if (shopName && shopName.trim() === adminProfile.shopName) {
    throw new ApiError(
      400,
      "The provided shop name is already set. Please use a different name."
    );
  }

  if (!shopName && !pinCode && !address && !city && !state) {
    throw new ApiError(400, "No data provided to update.");
  }

  if (shopName) adminProfile.shopName = shopName.trim();

  if (pinCode) adminProfile.shopAddress.pinCode = pinCode.trim();
  if (address) adminProfile.shopAddress.address = address.trim().toLowerCase();
  if (city) adminProfile.shopAddress.city = city.trim().toLowerCase();
  if (state) adminProfile.shopAddress.state = state.trim().toLowerCase();

  await adminProfile.save({ validateBeforeSave: false });

  res
    .status(200)
    .json(
      new ApiResponse(200, "Shop profile updated successfully", adminProfile)
    );
});

export { createProfile, updateShopName };

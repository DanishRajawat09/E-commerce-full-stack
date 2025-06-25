import { Address } from "../models/address.models.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const addAddress = asyncHandler(async (req, res) => {
  const { pinCode, city, state, address } = req.body;
  const user = req.user;

  const fields = [pinCode, city, state, address];
  if (
    fields.some((field) => typeof field !== "string" || field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  if (!user) {
    throw new ApiError(401, "Unauthorized request.");
  }

  const normalizedAddress = {
    pinCode: pinCode.trim(),
    city: city.trim().toLowerCase(),
    state: state.trim().toLowerCase(),
    address: address.trim().toLowerCase(),
  };

  const existingAddress = await Address.findOne({
    ...normalizedAddress,
    user: user._id,
  }).select("-createdAt -updatedAt -__v ");

  if (existingAddress) {
    throw new ApiError(400, "This address already exists in your account.");
  }

  const userAddress = await Address.create({
    ...normalizedAddress,
    user: user._id,
  });

  if (!userAddress) {
    throw new ApiError(400, "error while adding address");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "Address added successfully", userAddress));
});

const address = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(
      400,
      "Unauthorized request . user have to loigin for address"
    );
  }

  const addresses = await Address.find({ user: userId }).select(
    "-createdAt -updatedAt -__v"
  );

  if (!addresses) {
    throw new ApiError(400, "Address not Found, please add Address");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "get addresses successfully", addresses));
});

const updateAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const { city, state, address, pinCode } = req.body;

  if (!id) {
    throw new ApiError(400, "Address ID is required.");
  }

  const addressObj = {};
  if (city) addressObj.city = city.trim().toLowerCase();
  if (state) addressObj.state = state.trim().toLowerCase();
  if (address) addressObj.address = address.trim().toLowerCase();
  if (pinCode) addressObj.pinCode = pinCode.trim();

  if (Object.keys(addressObj).length === 0) {
    throw new ApiError(400, "Please provide at least one field to update.");
  }

  const updatedAddress = await Address.findByIdAndUpdate(
    { _id: id, user: userId },
    { $set: addressObj },
    { new: true }
  ).select("-createdAt -updatedAt -__v");

  if (!updatedAddress) {
    throw new ApiError(500, "Failed to update address in the database.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Address updated successfully", updatedAddress));
});

const deleteAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  if (!id) {
    throw new ApiError(400, "invalid address ID");
  }

  const deletedAddress = await Address.findByIdAndDelete({
    _id: id,
    user: userId,
  });

  if (!deletedAddress) {
    throw new ApiError(500, "error while deleting address");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "address deleted successfully", deletedAddress));
});
export { addAddress, updateAddress, address, deleteAddress };

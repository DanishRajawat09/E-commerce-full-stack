import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import {AdminProfile} from "../models/adminProfile.models.js" 
const CheckAdminProfile = asyncHandler(async (req, res , next) => {

  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(400, "Unauthorized Request, cannot check profile");
  }

  const adminProfile = await AdminProfile.findOne({ admin: userId }).populate("shopAddress");

  if (!adminProfile) {
    throw new ApiError(401, "Cannot find profile. Please create your profile first.");
  }

if (!adminProfile.fullName || !adminProfile.shopName || !adminProfile.adminAvatar?.url) {
  throw new ApiError(403, "Please complete your profile info", {
    redirectTo: "/admin/profile",
  });
}

if (
  !adminProfile.shopAddress?.pinCode ||
  !adminProfile.shopAddress?.city ||
  !adminProfile.shopAddress?.state ||
  !adminProfile.shopAddress?.address
) {
  throw new ApiError(403, "Please complete your shop address", {
    redirectTo: "/admin/address",
  });
}


  next();
});


export {CheckAdminProfile}
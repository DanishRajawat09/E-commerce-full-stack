import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const isAdmin = asyncHandler(async (req, res, next) => {
  const { role } = req.user;

  if (!role) {
    throw new ApiError(400, "User role is not defined.");
  }

  if (role !== "admin") {
    return res.status(403).json(
      new ApiResponse(403, "Access denied", {
        message: "Admins only",
      })
    );
  }

  next();
});

export default isAdmin;

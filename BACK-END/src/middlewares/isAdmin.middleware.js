import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const isAdmin = asyncHandler(async (req, res, next) => {
  const user = req.user;

  if (!user.role) {
    throw new ApiError(400, "User role is not defined.");
  }

  if (user.role !== "admin") {
    return res.status(403).json(
      new ApiResponse(403, "Access denied", {
        message: "Admins only",
      })
    );
  }
req.user = user
  next();
});

export default isAdmin;

import { User } from "../models/user.models.js";

const generateAccessRefreshToken = async (id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new ApiError(401, "inValid user id");
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    let accessTokenName = "";
    let refreshTokenName = "";
    if (user.role === "admin") {
      accessTokenName = "adminAccessToken";
      refreshTokenName = "adminRefreshToken";
    }
    if (user.role === "user") {
      accessTokenName = "userAccessToken";
      refreshTokenName = "userRefreshToken";
    }

    if (!accessToken || !refreshToken) {
      throw new ApiError(500, "Failed to generate tokens");
    }

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken, accessTokenName, refreshTokenName };
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to generate authentication tokens. Please try again."
    );
  }
};

export default generateAccessRefreshToken;

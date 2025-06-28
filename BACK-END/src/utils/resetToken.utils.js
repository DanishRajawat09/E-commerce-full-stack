import { JWT_RESET_EXPIRY, JWT_RESET_SECRET } from "../../config/env.js";
import ApiError from "./apiError.js";
import jwt from "jsonwebtoken"
const generateResetToken = async ({ _id, email, purpose, role }) => {
  const payload = {
    role: "user",
  };
  if (_id) payload.id = _id.toHexString();
  if (email) payload.email = email;
  if (purpose) payload.purpose = purpose;
  if (role) payload.role = role;


  let resetToken;
  try {
    resetToken = jwt.sign(payload, JWT_RESET_SECRET, {
      expiresIn: JWT_RESET_EXPIRY,
    });
  } catch (err) {
    throw new ApiError(
      500,
      "An error occurred while generating the reset token. Please try again later."
    );
  }
  return resetToken;
};

export { generateResetToken };

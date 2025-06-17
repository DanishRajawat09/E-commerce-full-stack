import { User } from "../models/user.models.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateOtp } from "../utils/basicUtils.js";

const sendOtp = (purpose) =>
  asyncHandler(async (req, res, next) => {
    const { contact, email } = req.body;

    if (!contact && !email) throw new ApiError(400, "Please provide either a contact number or email address.");

    const { otp, expiry } = generateOtp();

    const user = await User.findOneAndUpdate(
      {
        $and: [
          { $or: [{ email }, { contact }] },
          { isVerified: purpose === "reset" },
        ],
      },
      {
        $set: { otp, otpExpiry: expiry },
      },
      { new: true }
    );

    if (!user) throw new ApiError(404, "No user found with the provided information.");

    if (email) {
      console.log("otp send on email", otp);
    }
    if (contact) {
      console.log("otp send on contact", otp);
    }

    req.user = user;
    next();
  });

export default sendOtp;

import { User } from "../models/user.models.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateOtp } from "../utils/basicUtils.js";

const sendOtp = (purpose) =>
  asyncHandler(async (req, res, next) => {
    const userData = {};
    let purposeOtp = "";

    if (purpose === "register" || purpose === "resetPassword") {
      userData.email = req.body.email;
      userData.contact = req.body.contact;
      if (purpose === "register") {
        purposeOtp = purpose;
      }
    }

    if (purpose === "resetPassword") {
      purposeOtp = purpose;
    }

    if (purpose === "resetEmail") {
      if (!req.user?.contact) {
        throw new ApiError(
          400,
          "we cant find contact for reseting email contact is required"
        );
      } else {
        userData.contact = req.user.contact;
        purposeOtp = purpose;
      }
    }
    if (purpose === "resetContact") {
      if (!req.user.email) {
        throw new ApiError(
          400,
          "we cant find contact for reseting contact email is required"
        );
      } else {
        purposeOtp = purpose;
        userData.email = req.user.email;
      }
    }

    if (purpose === "resetPassword" || purpose === "register") {
      if (!userData.contact && !userData.email)
        throw new ApiError(
          400,
          "Please provide either a contact number or email address."
        );
    }

    if (purpose === "resetEmail") {
      if (!userData.contact)
        throw new ApiError(400, "Please provide email address.");
    }
    if (purpose === "resetContact") {
      if (!userData.email)
        throw new ApiError(400, "Please provide email address.");
    }

    const { otp, expiry } = generateOtp();

    const user = await User.findOneAndUpdate(
      {
        $and: [
          { $or: [{ email: userData.email }, { contact: userData.contact }] },
          { isVerified: purpose !== "register" },
        ],
      },
      {
        $set: { otp, otpExpiry: expiry },
      },
      { new: true }
    );

    if (!user)
      throw new ApiError(404, "No user found with the provided information.");

    if (userData.email) {
      console.log("otp send on email", otp);
    }
    if (userData.contact) {
      console.log("otp send on contact", otp);
    }
    const data = user.toObject();
    const updateUser = { ...data, purpose: purposeOtp };

    req.user = updateUser;
    next();
  });

export default sendOtp;

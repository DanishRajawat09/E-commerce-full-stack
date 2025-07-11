import { User } from "../models/user.models.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateOtp } from "../utils/basicUtils.js";
import bcrypt from "bcrypt";
const sendOtp = (purpose) =>
  asyncHandler(async (req, res, next) => {
    const userData = {};
    const purposeOtp = purpose;

    const emailResetPurposes = ["resetEmail", "resetAdminEmail"];
    const contactResetPurposes = ["resetContact", "resetAdminContact"];
    const publicPurposes = [
      "register",
      "adminRegister",
      "resetPassword",
      "resetAdminPassword",
    ];
    const adminPurpose = [
      "resetAdminEmail",
      "adminRegister",
      "resetAdminContact",
      "resetAdminPassword",
    ];
    let checkRole = "user";
    if (publicPurposes.includes(purpose)) {
      userData.email = req.body.email;
      userData.contact = req.body.contact;
    }

    if (emailResetPurposes.includes(purpose)) {
      if (!req.user?.contact) {
        throw new ApiError(400, "Contact is required to reset email.");
      }
      userData.contact = req.user.contact;
    }

    if (contactResetPurposes.includes(purpose)) {
      if (!req.user?.email) {
        throw new ApiError(400, "Email is required to reset contact.");
      }
      userData.email = req.user.email;
    }

    // Validations
    if (["register", "resetPassword"].includes(purpose)) {
      if (!userData.email && !userData.contact) {
        throw new ApiError(400, "Please provide email or contact number.");
      }
    }

    if (emailResetPurposes.includes(purpose) && !userData.contact) {
      throw new ApiError(400, "Contact is required to reset email.");
    }

    if (contactResetPurposes.includes(purpose) && !userData.email) {
      throw new ApiError(400, "Email is required to reset contact.");
    }

    const { otp, expiry } = generateOtp();
    const isRegisterPurpose = ["register", "adminRegister"].includes(purpose);

    if (adminPurpose.includes(purpose)) {
      checkRole = "admin"
    }

    const hashedOtp = await bcrypt.hash(otp, 10);
    console.log(hashedOtp);

    const user = await User.findOneAndUpdate(
      {
        $and: [
          { $or: [{ email: userData.email }, { contact: userData.contact }] },
          { isVerified: !isRegisterPurpose },{role : checkRole}
        ],
      },
      { $set: { otp: hashedOtp, otpExpiry: expiry } },
      { new: true }
    );

    if (!user) {
      throw new ApiError(404, "No user found with the provided information.");
    }

    if (userData.email) console.log("OTP sent to email:", otp);
    if (userData.contact) console.log("OTP sent to contact:", otp);

    req.user = { ...user.toObject(), purpose: purposeOtp };
    next();
  });

export default sendOtp;

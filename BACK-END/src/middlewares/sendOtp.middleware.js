import { User } from "../models/user.models.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateOtp } from "../utils/basicUtils.js";
import bcrypt from "bcrypt";
import { emailRegex, phoneRegex } from "../utils/regexValidator.js";
const sendOtp = (purpose) =>
  asyncHandler(async (req, res, next) => {
    const userData = {};
    const purposeOtp = purpose;

    const emailResetPurposes = ["resetEmail", "resetAdminEmail"];
    const contactResetPurposes = ["resetContact", "resetAdminContact"];
    const ResetPasswordPurposes = ["resetPassword", "resetAdminPassword"];
    const publicPurposes = ["register", "adminRegister"];
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
    if (ResetPasswordPurposes.includes(purpose)) {
      if (emailRegex.test(req.body.emailContact)) {
        userData.email = req.body.emailContact;
      } else if (phoneRegex.test(req.body.emailContact)) {
        userData.contact = req.body.emailContact;
      } else {
        throw new ApiError(422, "Please Enter a Valid Email or Phone Number");
      }
    }

    if (emailResetPurposes.includes(purpose)) {
      if (!req.body.newEmail) {
        throw new ApiError(400, "New Email is required for Send OTP");
      }
      userData.email = req.body.newEmail;
    }

    if (contactResetPurposes.includes(purpose)) {
      if (!req.body.newContact) {
        throw new ApiError(400, "New Contact is required for Send OTP");
      }
      userData.contact = req.body.newContact;
    }

    // Validations
    if (["register", "adminRegister"].includes(purpose)) {
      if (!userData.email && !userData.contact) {
        throw new ApiError(400, "Please provide email or contact number.");
      }
    }

    if (emailResetPurposes.includes(purpose) && !userData.email) {
      throw new ApiError(400, "New Email is required to reset email.");
    }

    if (contactResetPurposes.includes(purpose) && !userData.contact) {
      throw new ApiError(400, "New Contact is required to reset contact.");
    }

    const { otp, expiry } = generateOtp();
    const isRegisterPurpose = ["register", "adminRegister"].includes(purpose);

    if (adminPurpose.includes(purpose)) {
      checkRole = "admin";
    }

    const hashedOtp = await bcrypt.hash(otp, 10);

    const user = await User.findOneAndUpdate(
      {
        $and: [
          {
            $or: [{ email: userData?.email }, { contact: userData?.contact }],
          },
          { isVerified: !isRegisterPurpose },
          { role: checkRole },
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

    req.user = { ...user.toObject(), purpose: purposeOtp, userData: userData };
    next();
  });

export default sendOtp;

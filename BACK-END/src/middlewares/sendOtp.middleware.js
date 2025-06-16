
import { User } from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateOtp } from "../utils/besicUtils.js";

const sendOtp = asyncHandler(async (req, res , next) => {
  const { contact, email } = req.body;

  if (!contact && !email) throw new ApiError(400, "atlest select one option");

  const { otp, expiry } = generateOtp();

  const user = await User.findOneAndUpdate(
    { $or: [{ email: email }, { contact: contact }] },
    {
    otp,
    otpExpiry :  expiry,
    }
  );

  if (!user) {
    throw new ApiError(500, "database error while setting otp");
  }

  if (email) {
    console.log("otp send on email", otp);
  }
  if (contact) {
    console.log("otp send on contact", otp);
  }

  req.user = user

next()
});

export default sendOtp
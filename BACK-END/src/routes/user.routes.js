import { Router } from "express";
import {
  afterSend,
  loginUser,
  logoutUser,
  registerUser,
  afterVerify,
  handleForgotOtpSent,
  handleForgotOtpVerified,
  handleNewPasswordSet,
} from "../controllers/user.controller.js";
import sendOtp from "../middlewares/sendOtp.middleware.js";
import verifyOtp from "../middlewares/verifyOtp.js";
import otpAuth from "../middlewares/resetJwtverify.middleware.js";
import verifyJwt from "../middlewares/verifyJwt.middleware.js";

const router = Router();

// register and login routes
// ✅ User Auth
router.route("/register").post(registerUser);
router.route("/register/send-otp").post(sendOtp("register"), afterSend);
router.route("/register/verify-otp").post(otpAuth, verifyOtp, afterVerify);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt, logoutUser);

// ✅ Forgot Password
router
  .route("/password/forgot/send-otp")
  .post(sendOtp("reset"), handleForgotOtpSent);
router
  .route("/password/forgot/verify-otp")
  .post(otpAuth, verifyOtp, handleForgotOtpVerified);
router.route("/password/reset").post(otpAuth, handleNewPasswordSet);

export default router;

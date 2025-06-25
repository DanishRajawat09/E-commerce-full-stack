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
  handleEmailResetSendOtp,
  hanldeEmailResetVerifyOtp,
  handleNewEmailSet,
  handleContactResetSendOtp,
  hanldeContactResetVerifyOtp,
  handleNewContactSet,
} from "../controllers/user.controller.js";
import sendOtp from "../middlewares/sendOtp.middleware.js";
import verifyOtp from "../middlewares/verifyOtp.js";
import resetJwt from "../middlewares/resetJwtverify.middleware.js";
import verifyJwt from "../middlewares/verifyJwt.middleware.js";

const router = Router();

// register and login routes
// ✅ User Auth
router.route("/register").post(registerUser);
router.route("/register/send-otp").post(sendOtp("register"), afterSend);
router.route("/register/verify-otp").post(resetJwt("register"), verifyOtp, afterVerify);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwt, logoutUser);

// ✅ Forgot Password
router
  .route("/password/forgot/send-otp")
  .post(sendOtp("resetPassword"), handleForgotOtpSent);
router
  .route("/password/forgot/verify-otp")
  .post(resetJwt("resetPassword"), verifyOtp, handleForgotOtpVerified);
router
  .route("/password/reset")
  .patch(resetJwt("resetPassword"), handleNewPasswordSet);

// reset Email
router
  .route("/email/reset/send-otp")
  .post(verifyJwt, sendOtp("resetEmail"), handleEmailResetSendOtp);
router
  .route("/email/reset/verify-otp")
  .post(
    verifyJwt,
    resetJwt("resetEmail"),
    verifyOtp,
    hanldeEmailResetVerifyOtp
  );
router
  .route("/email/reset")
  .patch(verifyJwt, resetJwt("resetEmail"), handleNewEmailSet);

// reset contact
router
  .route("/contact/reset/send-otp")
  .post(verifyJwt, sendOtp("resetContact"), handleContactResetSendOtp);
router
  .route("/contact/reset/verify-otp")
  .post(
    verifyJwt,
    resetJwt("resetContact"),
    verifyOtp,
    hanldeContactResetVerifyOtp
  );
router
  .route("/contact/reset")
  .patch(verifyJwt, resetJwt("resetContact"), handleNewContactSet);

export default router;

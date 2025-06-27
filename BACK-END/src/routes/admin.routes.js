import Router from "express";
import {
  afterSend,
  afterVerify,
  handleEmailResetSendOtp,
  handleForgotOtpSent,
  handleForgotOtpVerified,
  handleNewEmailSet,
  handleNewPasswordSet,
  hanldeEmailResetVerifyOtp,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/adminUser.controller.js";
import sendOtp from "../middlewares/sendOtp.middleware.js";
import resetJwt from "../middlewares/resetJwtverify.middleware.js";
import { verifyJwtAdmin } from "../middlewares/verifyJwt.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";
import verifyOtp from "../middlewares/verifyOtp.js";
const router = Router();
// regiter admin
router.route("/register").post((req, res, next) => {
  req.body.role = "admin";
  next();
}, registerUser);
router.route("/register/send-otp").post(sendOtp("adminRegister"), afterSend);
router
  .route("/verify-otp")
  .post(resetJwt("adminRegister"), verifyOtp, afterVerify);

// login admin
router.route("/login").post((req, res, next) => {
  req.body.role = "admin";
  next();
}, loginUser);
// logout admin
router.route("/logout").post(verifyJwtAdmin, isAdmin, logoutUser);

//  forget password

router
  .route("/password/forget/send-otp")
  .post(sendOtp("resetAdminPassword"), handleForgotOtpSent);
router
  .route("/password/forget/verify-otp")
  .post(resetJwt("resetAdminPassword"), verifyOtp, handleForgotOtpVerified);
router
  .route("/new-password")
  .post(resetJwt("resetAdminPasswordVerify"), handleNewPasswordSet);

  // reset email 

  router.route("/email/reset/send-otp").post(verifyJwtAdmin , isAdmin , sendOtp("resetAdminEmail") , handleEmailResetSendOtp)
router.route("/email/reset/verify-otp").post(verifyJwtAdmin , isAdmin , resetJwt("resetAdminEmail"),  verifyOtp , hanldeEmailResetVerifyOtp )

router.route("/new-email").post(verifyJwtAdmin , isAdmin ,  resetJwt("resetAdminEmailVerify") , handleNewEmailSet )
export default router;

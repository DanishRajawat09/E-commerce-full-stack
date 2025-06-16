import { Router } from "express";
import {
    afterSend,
    loginUser,
  logoutUser,
  registerUser,
 
  afterVerify,
} from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";
import sendOtp from "../middlewares/sendOtp.middleware.js";
import verifyOtp from "../middlewares/verifyOtp.js";

const router = Router();

// register and login routes
router.route("/register").post(registerUser);
router.route("/send-otp").post(sendOtp , afterSend);
router.route("/verify-otp").post(verifyOtp , afterVerify);
router.route("/login").post(loginUser)
router.route("/logout").post(auth , logoutUser)

// forget password
router.route("/forget-password-otp").post(sendOtp)
router.route("/forget-password-verifyOtp").post(verifyOtp)
router.route()
export default router;

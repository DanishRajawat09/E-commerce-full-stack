import { Router } from "express";
import {
    loginUser,
  logoutUser,
  registerUser,
  sendOtp,
  verifyOtp,
} from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = Router();

// register and login routes
router.route("/register").post(registerUser);
router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(verifyOtp);
router.route("/login").post(loginUser)
router.route("/logout").post(auth , logoutUser)
export default router;

import { Router } from "express";
import { enterOtp, registerUser, sendOtp } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/send-otp").post(sendOtp)
router.route("/enter-otp").post(enterOtp)

export default router


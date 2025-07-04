import Router from "express";
import {
  afterSend,
  afterVerify,
  handleContactResetSendOtp,
  handleEmailResetSendOtp,
  handleForgotOtpSent,
  handleForgotOtpVerified,
  handleNewContactSet,
  handleNewEmailSet,
  handleNewPasswordSet,
  handleContactResetVerifyOtp,
  handleEmailResetVerifyOtp,
  loginUser,
  logoutUser,
  registerUser,
  handleUpdateAccessToken,
} from "../controllers/adminUser.controller.js";
import sendOtp from "../middlewares/sendOtp.middleware.js";
import resetJwt from "../middlewares/resetJwtverify.middleware.js";
import { verifyJwtAdmin } from "../middlewares/verifyJwt.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";
import verifyOtp from "../middlewares/verifyOtp.js";
import { addProducts, deleteProduct, updateProduct } from "../controllers/products.controller.js";
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
  .patch(resetJwt("resetAdminPasswordVerify"), handleNewPasswordSet);

// reset email

router
  .route("/email/reset/send-otp")
  .post(
    verifyJwtAdmin,
    isAdmin,
    sendOtp("resetAdminEmail"),
    handleEmailResetSendOtp
  );
router
  .route("/email/reset/verify-otp")
  .post(
    verifyJwtAdmin,
    isAdmin,
    resetJwt("resetAdminEmail"),
    verifyOtp,
   handleEmailResetVerifyOtp
  );

router
  .route("/new-email")
  .patch(
    verifyJwtAdmin,
    isAdmin,
    resetJwt("resetAdminEmailVerify"),
    handleNewEmailSet
  );

// resetContact

router
  .route("/contact/reset/send-otp")
  .post(
    verifyJwtAdmin,
    isAdmin,
    sendOtp("resetAdminContact"),
    handleContactResetSendOtp
  );

router
  .route("/contact/reset/verify-otp")
  .post(
    verifyJwtAdmin,
    isAdmin,
    resetJwt("resetAdminContact"),
    verifyOtp,
    handleContactResetVerifyOtp
  );

router
  .route("/new-contact")
  .patch(
    verifyJwtAdmin,
    isAdmin,
    resetJwt("resetAdminContactVerify"),
    handleNewContactSet
  );

  router.route("/update/auth-tokens").patch(verifyJwtAdmin , handleUpdateAccessToken)

  // admin products contol
router.route("/product/add").post(verifyJwtAdmin , isAdmin , addProducts) 
router.route("/product/delete/:productId").delete(verifyJwtAdmin , isAdmin , deleteProduct) 
router.route("/product/update/:productId").put(verifyJwtAdmin , isAdmin , updateProduct)
router.route("/products").get(verifyJwtAdmin , isAdmin , getAdminProducts)
export default router;

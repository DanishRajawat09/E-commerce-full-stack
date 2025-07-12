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
import {
  addProducts,
  deleteProduct,
  getAdminProducts,
  updateProduct,
} from "../controllers/products.controller.js";
import {
  editOrderDetails,
  orderDetailsAdmin,
} from "../controllers/order.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
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

router
  .route("/update/auth-token")
  .patch(verifyJwtAdmin, handleUpdateAccessToken);

// admin products contol
router
  .route("/product/add")
  .post(verifyJwtAdmin, isAdmin, upload.array("images", 3), addProducts);
router
  .route("/product/delete/:productId")
  .delete(verifyJwtAdmin, isAdmin, deleteProduct);
router
  .route("/product/update/:productId/:imageId1/:imageId2/imageId3")
  .put(verifyJwtAdmin, isAdmin, upload.array("images", 3), updateProduct);
router.route("/product").get(verifyJwtAdmin, isAdmin, getAdminProducts);

// order

router.route("/order").get(verifyJwtAdmin, isAdmin, orderDetailsAdmin);
router
  .route("/order/status/:productId")
  .patch(verifyJwtAdmin, isAdmin, editOrderDetails);

export default router;

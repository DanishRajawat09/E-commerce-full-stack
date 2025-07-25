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
  handleEmailResetVerifyOtp,
  handleNewEmailSet,
  handleContactResetSendOtp,
  handleContactResetVerifyOtp,
  handleNewContactSet,
  handleUpdateAccessToken,
  getUserAdminInfo,
  checkResetToken,
} from "../controllers/adminUser.controller.js";
import sendOtp from "../middlewares/sendOtp.middleware.js";
import verifyOtp from "../middlewares/verifyOtp.js";
import resetJwt from "../middlewares/resetJwtverify.middleware.js";
import { verifyJwtUser, verifyJwtUserRefresh } from "../middlewares/verifyJwt.middleware.js";
import {
  getProducts,
  productDetail,
} from "../controllers/products.controller.js";
import {
  addToCart,
  deleteCartProduct,
  getUserCart,
} from "../controllers/cart.controller.js";
import {
  deleteOrderUser,
  editOrderDetails,
  orderCartProducts,
  orderSoloProduct,
} from "../controllers/order.controller.js";

const router = Router();

// register and login routes
// ✅ User Auth
router.route("/").get(verifyJwtUser, getUserAdminInfo);
router.route("/register").post(registerUser);
router.route("/register/send-otp").post(sendOtp("register"), afterSend);
router
  .route("/register/verify-otp")
  .post(resetJwt("register"), verifyOtp, afterVerify);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJwtUser, logoutUser);

// ✅ Forgot Password
router
  .route("/password/forgot/send-otp")
  .post(sendOtp("resetPassword"), handleForgotOtpSent);
router
  .route("/password/forgot/verify-otp")
  .post(resetJwt("resetPassword"), verifyOtp, handleForgotOtpVerified);
router
  .route("/password/reset")
  .patch(resetJwt("resetPasswordVerify"), handleNewPasswordSet);

// reset Email
router
  .route("/email/reset/send-otp")
  .post(verifyJwtUser, sendOtp("resetEmail"), handleEmailResetSendOtp);
router
  .route("/email/reset/verify-otp")
  .post(
    verifyJwtUser,
    resetJwt("resetEmail"),
    verifyOtp,
    handleEmailResetVerifyOtp
  );
router
  .route("/email/reset")
  .patch(verifyJwtUser, resetJwt("resetEmailVerify"), handleNewEmailSet);

// reset contact
router
  .route("/contact/reset/send-otp")
  .post(verifyJwtUser, sendOtp("resetContact"), handleContactResetSendOtp);
router
  .route("/contact/reset/verify-otp")
  .post(
    verifyJwtUser,
    resetJwt("resetContact"),
    verifyOtp,
    handleContactResetVerifyOtp
  );
router
  .route("/contact/reset")
  .patch(verifyJwtUser, resetJwt("resetContactVerify"), handleNewContactSet);

// update access token
router
  .route("/update/auth-tokens")
  .patch(verifyJwtUserRefresh, handleUpdateAccessToken);


//check resetToken
router.route("/resettoken").get(checkResetToken)
// get all products
router.route("/products").get(verifyJwtUser, getProducts);
router.route("/product/detail/:productId").get(verifyJwtUser, productDetail);

// cart
router.route("/cart/add/:productId").post(verifyJwtUser, addToCart);
router
  .route("/cart/delete/:productId")
  .delete(verifyJwtUser, deleteCartProduct);
router.route("/cart").get(verifyJwtUser, getUserCart);

// order
router.route("/order/add/:productId").post(verifyJwtUser, orderSoloProduct);
router.route("/order/add/cart").post(verifyJwtUser, orderCartProducts);
router.route("/order/delete/:productId").delete(verifyJwtUser, deleteOrderUser);
router.route("/order/status/:productId").patch(verifyJwtUser, editOrderDetails);
export default router;

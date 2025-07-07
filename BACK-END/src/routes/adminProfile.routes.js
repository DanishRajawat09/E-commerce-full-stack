import { Router } from "express";
import { verifyJwtAdmin } from "../middlewares/verifyJwt.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";
import {
  createProfile,
  updateShopName,
} from "../controllers/adminProfile.controller.js";
import { addAddress } from "../controllers/address.controller.js";

const router = Router();

router.route("/create-profile").post(verifyJwtAdmin, isAdmin, createProfile);
router.route("/add-shop-address").post(verifyJwtAdmin, isAdmin, addAddress);
router
  .route("/update/shop-name")
  .patch(verifyJwtAdmin, isAdmin, updateShopName);

export default router;

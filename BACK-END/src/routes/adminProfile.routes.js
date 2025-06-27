import { Router } from "express";
import { verifyJwtAdmin } from "../middlewares/verifyJwt.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";
import { createProfile } from "../controllers/adminProfile.controller.js";
import { addAddress } from "../controllers/address.controller.js";

const router = Router();

router.route("/create-profile").post(verifyJwtAdmin, isAdmin, createProfile);
router.route("/add-shop-address").post(verifyJwtAdmin, isAdmin, addAddress);
export default router;

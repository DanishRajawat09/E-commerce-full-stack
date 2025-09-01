import { Router } from "express";
import { verifyJwtUser } from "../middlewares/verifyJwt.middleware.js";
import {
  addAddress,
  address,
  deleteAddress,
  updateAddress,
} from "../controllers/address.controller.js";

const router = Router();

router.route("/add-address").post(verifyJwtUser, addAddress);
router.route("/update-address/:id").post(verifyJwtUser, updateAddress);
router.route("/getAddress").get(verifyJwtUser, address);
router.route("/delete-address/:id").delete(verifyJwtUser, deleteAddress);
export default router;

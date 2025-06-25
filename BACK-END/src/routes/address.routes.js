import { Router } from "express";
import verifyJwt from "../middlewares/verifyJwt.middleware.js";
import {
  addAddress,
  address,
  deleteAddress,
  updateAddress,
} from "../controllers/address.controller.js";

const router = Router();

router.route("/add-address").post(verifyJwt, addAddress);
router.route("/update-address/:id").post(verifyJwt, updateAddress);
router.route("/getAddress").get(verifyJwt, address);
router.route("/delete-address/:id").delete(verifyJwt, deleteAddress);
export default router;

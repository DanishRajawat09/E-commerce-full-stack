import Router from "express";
import {
  createProfile,
  updateFullName,
} from "../controllers/profile.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import verifyJwt from "../middlewares/verifyJwt.middleware.js";
const router = Router();

router.route("/create").post(verifyJwt, upload.single("avatar"), createProfile);
router.route("/update-fullname").post(verifyJwt, updateFullName);

export default router;

import Router from "express";
import {
  createProfile,
  updateAvatar,
  updateFullName,
} from "../controllers/profile.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwtUser } from "../middlewares/verifyJwt.middleware.js";
const router = Router();

router
  .route("/create")
  .post(verifyJwtUser, upload.single("avatar"), createProfile);
router.route("/update-fullname").post(verifyJwtUser, updateFullName);
router
  .route("/update-avatar")
  .post(verifyJwtUser, upload.single("avatar"), updateAvatar);
export default router;

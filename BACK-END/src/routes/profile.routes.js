import Router from "express"
import { createProfile } from "../controllers/profile.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import verifyJwt from "../middlewares/verifyJwt.middleware.js"
const router = Router()

router.route("/create").post(verifyJwt , upload.single("avatar") , createProfile)



export default router
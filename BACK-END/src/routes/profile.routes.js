import Router from "express"
import { createProfile } from "../controllers/profile.controller.js"

const router = Router()

router.route("/create" , createProfile)


export default router
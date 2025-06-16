import { JWT_ACCESSTOKEN_SECRET } from "../../config/env.js";
import { User } from "../models/user.models.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

const auth = asyncHandler(async (req ,res , next) => {
    const incomingToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer " , "")

    if (!incomingToken) {
        throw new ApiError(400 , "we cant find token")
    }

    const decoded =  jwt.verify(incomingToken , JWT_ACCESSTOKEN_SECRET)

    if (!decoded) {
        throw new ApiError(500 , "error while decoded")
    }


    const user = await User.findById(decoded._id)

    if (!user) {
        throw new ApiError(500 , "user not found")
    }
// console.log(user);

    req.user = user

next()
})

export default auth
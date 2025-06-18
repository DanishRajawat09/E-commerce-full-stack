import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js"
import uploadImage from "../utils/cloudinary.js";
import { Profile } from "../models/profile.models.js";
import ApiResponse from "../utils/apiResponse.js"
const createProfile = asyncHandler(async (req ,res) => {
    const {fullName} = req.body
const user = req.user
    if (!fullName) {
        throw new ApiError(400 , "fullname is required")
    }
    if (!user) {
        throw new ApiError(400 , "User not found invalid token")
    }

    const filePath = req.file?.path

    if (!filePath) {
        throw new ApiError(400 , "avatar not found upload again")
    }
const result = await uploadImage(filePath)
    
if (!result) {
    throw new ApiError(400 , "avatar not upload properly")
}

const profile = await Profile.create({
    fullName,
    avatar : {
        url : result.url,
        publicId : result.public_id
    },
    user : user._id
})

if (!profile) {
    throw new ApiError(500 , "we could not create profile. something went wrong try again")
}

res.status(200).json(
    new ApiResponse(200 , "profile created succssfully" , profile)
)

})

export {createProfile}
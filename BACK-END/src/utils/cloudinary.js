import {v2 as cloudinary} from "cloudinary"
import { CLOUD_API_KEY, CLOUD_API_SECRET, CLOUD_NAME } from "../../config/env.js"
import fs from "fs"

cloudinary.config({
    cloud_name : CLOUD_NAME,
    api_key : CLOUD_API_KEY,
    api_secret : CLOUD_API_SECRET
})

const uploadImage = async (filepath) => {

    if (!filepath) {
        return null
    }
      const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
       resource_type: "auto"
    };
    try {
         const result = await cloudinary.uploader.upload(filepath, options);
         console.log(result);
         fs.unlinkSync(filepath)
         return result
         
    } catch (error) {
        console.error("error while uploading on cloudinary" , error);
        fs.unlinkSync(filepath)
        return null
    }
}

export default uploadImage
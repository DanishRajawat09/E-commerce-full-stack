import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { PORT, MONGODB_URI, NODE_ENV  ,CORS_ORIGIN ,JWT_ACCESSTOKEN_SECRET , JWT_ACCESSTOKEN_EXPIRY , JWT_REFRESHTOKEN_SECRET , JWT_REFRESHTOKEN_EXPIRY , JWT_RESET_SECRET , JWT_RESET_EXPIRY , CLOUD_NAME , CLOUD_API_KEY , CLOUD_API_SECRET} = process.env;

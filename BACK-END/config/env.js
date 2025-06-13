import dotenv from "dotenv";

dotenv.config({path : `./.env.${NODE_ENV || "development"}.local`})

 export const {PORT} = process.env
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { PORT, MONGODB_URI, NODE_ENV } = process.env;

import mongoose from "mongoose";
import { MONGODB_URI } from "../../config/env.js";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${MONGODB_URI}/${DB_NAME}`
    );
    console.log(connectionInstance.connection.host);
  } catch (error) {
    console.error("mongodb connection error".error);
    process.exit(1);
  }
};

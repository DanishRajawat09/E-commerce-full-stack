import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CORS_ORIGIN } from "../config/env.js";
import userRouter from "./routes/user.routes.js";
import profileRouter from "./routes/profile.routes.js";
import addressRouter from "./routes/address.routes.js";
const app = express();
// middlewares
app.use(express.json({ limit: "16kb" }));
app.use(cors({ origin: CORS_ORIGIN, credentials: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/address", addressRouter);
export { app };

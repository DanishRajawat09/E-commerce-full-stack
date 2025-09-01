import { PORT } from "../config/env.js";
import { connectDB } from "./db/connectDB.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
      console.log("db and app running subccessfully");
    });
    app.on("error", (error) => {
      console.log("having issue to talk to database", error);
    });
  })
  .catch((error) => {
    console.error("dbConnection issue", error);
  });

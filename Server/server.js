import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/db.js";
import router from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import routers from "./routes/tracker.js";
import cors from "cors";

dotenv.config();
await connectDB();

const app = express();
app.use(
  cors({
    origin: "https://income-expense-tracker-nine.vercel.app",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth/", router);
app.use("/api/tracker/", routers);

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

export default app;

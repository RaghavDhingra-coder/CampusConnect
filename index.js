import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./utils/db.js";

import userRouter from "./routes/user.route.js";
import ClubRouter from "./routes/club.route.js";
import EventRouter from "./routes/event.route.js";
import RegisterationRouter from "./routes/registeration.route.js";
import Paymentrouter from "./routes/payment.route.js";
import cors from "cors"

const app = express();

// ✅ Middlewares
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: true, // ✅ set CLIENT_URL in Render env vars
    credentials: true
}))

// ✅ API Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/club", ClubRouter);
app.use("/api/v1/event", EventRouter);
app.use("/api/v1/registeration", RegisterationRouter);
app.use("/api/v1/payment", Paymentrouter);

// ✅ Serve frontend (VERY IMPORTANT)
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "dist")));

// ✅ Express 5 safe fallback (NO "*", NO "/*")
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ✅ Start server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  connectDB();
  console.log(`Listening at port: ${port}`);
});
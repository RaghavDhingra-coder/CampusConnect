import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import connectDB from "./utils/db.js";

import userRouter from "./routes/user.route.js";
import ClubRouter from "./routes/club.route.js";
import EventRouter from "./routes/event.route.js";
import RegisterationRouter from "./routes/registeration.route.js";
import Paymentrouter from "./routes/payment.route.js";

const app = express();

// ✅ middleware
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ❌ REMOVE CORS (not needed now)
// app.use(cors(...))

// ✅ API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/club", ClubRouter);
app.use("/api/v1/event", EventRouter);
app.use("/api/v1/registeration", RegisterationRouter);
app.use("/api/v1/payment", Paymentrouter);

// ✅ SERVE FRONTEND
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// ✅ start server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  connectDB();
  console.log(`Listening at port: ${port}`);
});
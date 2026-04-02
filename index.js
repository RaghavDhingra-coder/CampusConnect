import dotenv from "dotenv";
dotenv.config();



import express from "express"
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin:"https://campus-connect-frontend-guk58q5nm-raghav-dhingras-projects.vercel.app",
    credentials: true
};


app.use(cors(corsOptions));

app.use("/api/v1/user",userRouter)
app.use("/api/v1/club",ClubRouter)
app.use("/api/v1/event",EventRouter)
app.use("/api/v1/registeration",RegisterationRouter)

app.use("/api/v1/payment",Paymentrouter);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    connectDB();
    console.log(`Listening at port: ${port}`);
});
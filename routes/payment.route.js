import express from "express";

import { createOrder } from "../controller/payment.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const Paymentrouter = express.Router();

Paymentrouter.route("/create-order").post(isAuthenticated,createOrder)


export default Paymentrouter;
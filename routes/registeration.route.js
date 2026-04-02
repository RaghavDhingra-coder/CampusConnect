import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { ApplyEvent, checkRegistration, downloadTicket, getAppliedEvents, getRegisterations, updateStatus } from "../controller/registeration.controller.js"


const RegisterationRouter = express.Router()


RegisterationRouter.route("/register/:id").get(isAuthenticated,ApplyEvent)

RegisterationRouter.route("/get").get(isAuthenticated,getAppliedEvents)

RegisterationRouter.route("/:id/registerations").get(isAuthenticated,getRegisterations)


RegisterationRouter.route("/status/:id/update").put(isAuthenticated,updateStatus)

RegisterationRouter.route("/ticket/:ticketId").get(isAuthenticated,downloadTicket)

RegisterationRouter.route("/check/:id").get(isAuthenticated, checkRegistration);


export default RegisterationRouter
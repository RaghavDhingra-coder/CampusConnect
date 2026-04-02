import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { getAdminEvents, getAllEvents, getEventById, postEvent } from "../controller/event.controller.js"


const EventRouter = express.Router()

EventRouter.route("/post").post(isAuthenticated,postEvent)
EventRouter.route("/get").get(isAuthenticated,getAllEvents)
EventRouter.route("/getadminEvents").get(isAuthenticated,getAdminEvents)
EventRouter.route("/get/:id").get(isAuthenticated,getEventById)


export default EventRouter
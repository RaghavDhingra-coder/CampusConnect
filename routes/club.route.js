import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { getClubById, getClubs, RegisterClub, updateClub } from "../controller/club.controller.js"


const ClubRouter = express.Router()

ClubRouter.route("/register").post(isAuthenticated,RegisterClub)
ClubRouter.route("/get").get(isAuthenticated,getClubs)
ClubRouter.route("/get/:id").get(isAuthenticated,getClubById)
ClubRouter.route("/update/:id").put(isAuthenticated,updateClub)


export default ClubRouter
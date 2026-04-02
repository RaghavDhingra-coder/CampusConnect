import express from "express"
import { login, logout, register, updateProfile } from "../controller/user.controller.js"
import isAuthenticated from "../middleware/isAuthenticated.js"


const userRouter = express.Router()

userRouter.route("/register").post(register)
userRouter.route("/login").post(login)
userRouter.route("/logout").get(logout)
userRouter.route("/profile/update").put(isAuthenticated,updateProfile)

export default userRouter
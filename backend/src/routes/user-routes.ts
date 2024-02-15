import { Router } from "express"
import { getAllUsers, userLogin, userSignup } from "../controllers/user-controllers.js"
import { validate, signupValidator, loginValidator } from "../utils/validators.js"

const userRoutes = Router()

userRoutes.get("/", getAllUsers) //domain/api/v1/user/
userRoutes.post("/signup", validate(signupValidator), userSignup) //domain/api/v1/user/signup
userRoutes.post("/login", validate(loginValidator), userLogin) //domain/api/v1/user/login

export default userRoutes
import { Router } from "express";
import {
  getAllUsers,
  userLogin,
  userLogout,
  userSignup,
  verifyUser,
} from "../controllers/user-controllers.js";
import {
  validate,
  signupValidator,
  loginValidator,
} from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers); //domain/api/v1/user/
userRoutes.post("/signup", validate(signupValidator), userSignup); //domain/api/v1/user/signup
userRoutes.post("/login", validate(loginValidator), userLogin); //domain/api/v1/user/login
userRoutes.get("/auth-status", verifyToken, verifyUser); //domain/api/v1/user/auth-status
userRoutes.get("/logout", verifyToken, userLogout); //domain/api/v1/user/logout

export default userRoutes;

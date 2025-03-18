import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.js";

// Create authentication routes
const authRouter = Router();

// Defining routes
authRouter.post("/auth/register",registerUser);
authRouter.post("/auth/login",loginUser);

// Exporting router
export default authRouter;

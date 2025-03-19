import { Router } from "express";
import { forgotPassword, loginUser, registerUser } from "../controllers/user.js";

// Create authentication routes
const authRouter = Router();

// Defining routes
authRouter.post("/auth/register",registerUser);
authRouter.post("/auth/login",loginUser);
authRouter.post("/auth/recover-password",forgotPassword);

// Exporting router
export default authRouter;

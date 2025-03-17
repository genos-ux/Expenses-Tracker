import { Router } from "express";
import { Register} from "../controllers/expenses.js";

// Create products router
const expensesRouter = Router();

// Define routes
expensesRouter.post('/events/register',Register);


// Export router
export default expensesRouter;

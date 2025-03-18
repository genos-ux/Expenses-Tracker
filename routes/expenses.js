import { Router } from "express";
import { addExpenses, deleteExpense, getExpenses} from "../controllers/expenses.js";

// Create products router
const expensesRouter = Router();

// Define routes
expensesRouter.post('/expenses',addExpenses);
expensesRouter.get('/expenses/',getExpenses);
expensesRouter.delete('/expenses/:id',deleteExpense);


// Export router
export default expensesRouter;

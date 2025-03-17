import { Schema, model } from "mongoose";

const expenseSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    
  },
  { timestamps: true }
);

export const ExpenseModel = model("Expense", expenseSchema);

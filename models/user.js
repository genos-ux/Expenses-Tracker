import { Schema, model } from "mongoose";

const expenseSchema = new Schema(
  {
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    
  },
  { timestamps: true }
);

export const UserModel = model("Expense", expenseSchema);

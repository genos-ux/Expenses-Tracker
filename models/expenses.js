import { Schema, model } from "mongoose";

const expenseSchema = new Schema({
    amount: Number,
    category: {
        type: String,
        enum: ['personal','business','household']
    },
    date: Date
}, {timestamps: true});

export const ExpenseModel = model('Expense',expenseSchema);
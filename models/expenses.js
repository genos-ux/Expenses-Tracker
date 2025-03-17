import { Schema, model } from "mongoose";

const expenseSchema = new Schema({
    name: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type:String, required: true},
    amount: Number,
    category: {
        type: String,
        enum: ['personal','business','household']
    },
    date: Date
}, {timestamps: true});

export const ExpenseModel = model('Expense',expenseSchema);

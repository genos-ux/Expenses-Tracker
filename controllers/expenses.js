import { ExpenseModel } from "../models/user.js";

export const addExpenses = async(req,res)=> {
    // const {amount,category,date} = req.body;

    const expense = await ExpenseModel.create(req.body);

    res.status(201).json({message: 'Expense created.'})
}

export const getExpenses = async(req,res) => {
    const expense = await ExpenseModel.find();

    res.status(200).json(expense);
}

export const deleteExpense = async(req,res) => {
    const id = req.params.id;
    const expense = await ExpenseModel.findById(id);

    if(!expense)
    {
        return res.status(404).send('Expense not found.');
    }

    return res.status(200).send('Expense deleted');
}
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import expensesRouter from './routes/expenses.js';

const app = express();

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('Database connected'))
.catch(err => console.log(err));

app.get('/',(req,res)=>{
    res.send("hello world");
})

app.use(express.json());

app.use(expensesRouter);


app.listen(3200, ()=> {
    console.log("Server is running at port 3000");
})

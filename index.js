import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import expensesRouter from './routes/expenses.js';
import authRouter from './routes/auth.js';

const app = express();

// Database connection
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('Database connected'))
.catch(err => console.log(err));

// Body parser
app.use(express.json());

// Routes middlewares
app.use('/api/v1/',authRouter);
app.use('/api/v1',expensesRouter);


app.listen(3200, ()=> {
    console.log("Server is running at port 3000");
})

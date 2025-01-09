import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js'
import cookieParser from 'cookie-parser';
import userRouter from './routes/user-route.js';
import recipeRouter from './routes/recipe-route.js'
import coverRouter from './routes/recipeCover-route.js'
import path from 'path'
import cors from 'cors';
dotenv.config();
connectDB()
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
}));

app.use("/api/users", userRouter)
app.use("/api/cover", coverRouter)
app.use("/api/recipes",recipeRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
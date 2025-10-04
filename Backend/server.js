import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 2000;

connectDB();

app.listen(PORT, ()=>{
    console.log("Server Running on PORT:",PORT);
})
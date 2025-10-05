import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import adminRoutes from './routes/admin.route.js';
import cookieParser from 'cookie-parser';
import eventRoutes from './routes/event.route.js'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 2000;

connectDB();

app.use('/api/admin',adminRoutes);
app.use('/api/admin',eventRoutes);

app.listen(PORT, ()=>{
    console.log("Server Running on PORT:",PORT);
})
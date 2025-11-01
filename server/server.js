import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import adminRoutes from './routes/admin.route.js';
import cookieParser from 'cookie-parser';
import eventRoutes from './routes/event.route.js'
import donationRoutes from "./routes/donation.route.js"
import cors from 'cors';
import webhookRoutes from "./routes/webhook.route.js";
import visitRoutes from "./routes/visit.route.js";
import volunteerRoutes from "./routes/volunteer.route.js"
import contactRoutes from "./routes/contact.route.js"




dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 2000;

connectDB();

app.use('/api/admin',adminRoutes);
app.use('/api/events',eventRoutes);
app.use("/api/donations",donationRoutes);
app.use("/api/webhooks", webhookRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/volunteers",volunteerRoutes)
app.use("/api/contact", contactRoutes);


app.listen(PORT, ()=>{
    console.log("Server Running on PORT:",PORT);
})
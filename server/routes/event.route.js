// routes/eventRoutes.js
import express from "express";
import { createEvent, deleteEvent, getEventById, getEvents, updateEvent } from "../controllers/event.controller.js";
import { protectAdmin } from "../middleware/auth.middleware.js";


const router = express.Router();

// Public route to get all events (optional)
router.get("/", getEvents);

// Admin routes
router.post("/", protectAdmin, createEvent);
router.get("/:id", protectAdmin, getEventById);
router.put("/:id", protectAdmin, updateEvent);
router.delete("/:id", protectAdmin, deleteEvent);

export default router;

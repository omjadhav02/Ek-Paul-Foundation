// routes/eventRoutes.js
import express from "express";
import { createEvent, deleteEvent, getEventById, getEvents, updateEvent } from "../controllers/event.controller.js";
import { protectAdmin } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.js";


const router = express.Router();

// Public route to get all events (optional)
router.get("/", getEvents);
router.get("/:id", getEventById);

// Admin routes
router.post("/", protectAdmin, upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'videos', maxCount: 3 },
  ]), createEvent);
router.put("/:id", protectAdmin, updateEvent);
router.delete("/:id", protectAdmin, deleteEvent);

export default router;

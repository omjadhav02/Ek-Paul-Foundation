import express from "express";
import {
  createEvent,
  deleteEvent,
  getEventById,
  getEvents,
  updateEvent,
} from "../controllers/event.controller.js";
import { protectAdmin } from "../middleware/auth.middleware.js";
import uploadEvents from "../middleware/uploadEvents.js";

const router = express.Router();

// 🌍 Public routes
router.get("/", getEvents);
router.get("/:id", getEventById);

// 🔒 Admin routes
router.post(
  "/",
  protectAdmin,
  uploadEvents.fields([
    { name: "images", maxCount: 10 },
    { name: "videos", maxCount: 3 },
  ]),
  createEvent
);
router.put("/:id", protectAdmin, uploadEvents.fields([
    { name: "images", maxCount: 10 },
    { name: "videos", maxCount: 3 },
  ]), updateEvent);
router.delete("/:id", protectAdmin, deleteEvent);

export default router;

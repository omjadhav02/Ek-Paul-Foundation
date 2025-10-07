import express from "express";
import {
  createVolunteer,
  getAllVolunteers,
  getVolunteerById,
  deleteVolunteer,
  verifyVolunteerEmail,
  updateVolunteerStatus,
} from "../controllers/volunteer.controller.js";
import { protectAdmin } from "../middleware/auth.middleware.js";


const router = express.Router();

// Public route – anyone can apply
router.post("/create", createVolunteer);
router.post("/verify", verifyVolunteerEmail); // Endpoint to verify OTP and activate volunteer account

// Admin routes
router.get("/", protectAdmin, getAllVolunteers);
router.get("/:id", protectAdmin, getVolunteerById);
router.delete("/:id", protectAdmin, deleteVolunteer);
router.put("/status/:id", protectAdmin, updateVolunteerStatus);

export default router;

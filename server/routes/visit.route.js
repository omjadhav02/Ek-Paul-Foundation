import express from "express";
import {
  addVisit,
  getAllVisits,
  getVisitById,
  updateVisit,
  deleteVisit,
} from "../controllers/visit.controller.js";
import { protectAdmin } from "../middleware/auth.middleware.js";
import uploadVisits from "../middleware/uploadVisits.js";

const router = express.Router();

// 🌍 Public routes
router.get("/", getAllVisits);
router.get("/:id", getVisitById);

// 🔒 Admin routes
router.post(
  "/add",
  protectAdmin,
  uploadVisits.fields([
    { name: "images", maxCount: 10 },
    { name: "videos", maxCount: 3 },
  ]),
  addVisit
);
router.put("/:id", protectAdmin, updateVisit);
router.delete("/:id", protectAdmin, deleteVisit);

export default router;

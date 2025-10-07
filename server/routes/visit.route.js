import express from "express";
import {
  addVisit,
  getAllVisits,
  getVisitById,
  updateVisit,
  deleteVisit
} from "../controllers/visit.controller.js";
import { protectAdmin } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllVisits);
router.get("/:id", getVisitById);

router.post("/add", protectAdmin, upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'videos', maxCount: 3 },
  ]), addVisit);
router.put("/:id", protectAdmin, updateVisit);
router.delete("/:id", protectAdmin, deleteVisit);

export default router;

import express from "express";
import { createOrder, deleteDonation, getAllDonations, getDonationByID, updateDonation, verifyPayment } from "../controllers/donation.controller.js";
import { protectAdmin } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);

router.get("/list",protectAdmin,getAllDonations);
router.get("/:id",protectAdmin,getDonationByID);
router.put("/:id",protectAdmin,updateDonation);
router.delete("/:id",protectAdmin, deleteDonation);

export default router;
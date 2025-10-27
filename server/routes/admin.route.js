import express from "express";
import {
  signup,
  login,
  logout,
  protectAdmin,
} from "../controllers/admin.controller.js";

const router = express.Router();

// Public routes
router.post("/signup", signup); // Email/Password signup
router.post("/login", login);   // Login with ID token (Email/Password or Google)

// Protected route
router.post("/logout", protectAdmin, logout);

export default router;

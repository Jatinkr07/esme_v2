import express from "express";
import {
  login,
  logout,
  getCurrentAdmin,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", protect, logout);
router.get("/me", protect, getCurrentAdmin);

export default router;

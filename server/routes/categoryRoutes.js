import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.use(protect);
router.post("/", createCategory);
router.get("/", getCategories);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;

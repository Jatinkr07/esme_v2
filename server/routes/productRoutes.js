import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addVariant,
  updateVariant,
  deleteVariant,
} from "../controllers/productController.js";

const router = express.Router();

router.use(protect); // Apply protect middleware to all routes
router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/:id/variants", addVariant);
router.put("/:id/variants/:variantId", updateVariant);
router.delete("/:id/variants/:variantId", deleteVariant);

export default router;

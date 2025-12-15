import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", protect, createProduct);
router.get("/", protect, getProducts);
router.delete("/:id", protect, deleteProduct);

export default router;

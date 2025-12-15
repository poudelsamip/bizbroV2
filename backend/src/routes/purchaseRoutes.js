import express from "express";
import {
  addStock,
  createPurchase,
  getPurchases,
} from "../controllers/purchaseController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPurchase);
router.get("/", protect, getPurchases);
// router.get("/add-stock", protect, addStock);

export default router;

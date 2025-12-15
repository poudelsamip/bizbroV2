import express from "express";
import { createSale, getSales } from "../controllers/saleController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createSale);
router.get("/", protect, getSales);

export default router;

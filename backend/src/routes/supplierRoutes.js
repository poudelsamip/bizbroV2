import express from "express";
import {
  createSupplier,
  getSuppliers,
  sendPayment,
} from "../controllers/supplierController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createSupplier);
router.get("/", protect, getSuppliers);
router.post("/:id/sendpayment", protect, sendPayment);

export default router;

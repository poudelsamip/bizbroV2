import express from "express";
import {
  createCustomer,
  getCustomers,
  receivePayment,
} from "../controllers/customerController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createCustomer);
router.get("/", protect, getCustomers);
router.post("/:id/receivepayment", protect, receivePayment);

export default router;

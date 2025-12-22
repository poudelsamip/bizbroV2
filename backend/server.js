import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/db.js";
dotenv.config();

import customerRoutes from "./src/routes/customerRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import supplierRoutes from "./src/routes/supplierRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import salesRoutes from "./src/routes/saleRoutes.js";
import purchaseRoutes from "./src/routes/purchaseRoutes.js";
import transactionRoutes from "./src/routes/transactionRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

const frontendUrl = process.env.FRONTEND_URL;
const allowedOrigins = [frontendUrl, "http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/customers", customerRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("running good");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

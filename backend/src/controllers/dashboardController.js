import Sale from "../models/Sale.js";
import Purchase from "../models/Purchase.js";
import Transaction from "../models/Transaction.js";
import Customer from "../models/Customer.js";
import Supplier from "../models/Supplier.js";
import Inventory from "../models/Product.js"; // This is your itemModel
import mongoose from "mongoose";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const { range } = req.query;

    const now = new Date();
    let startDate = null;

    if (range === "7days") {
      startDate = new Date();
      startDate.setDate(now.getDate() - 7);
    } else if (range === "month") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (range === "year") {
      startDate = new Date(now.getFullYear(), 0, 1);
    }

    const matchStage = { user: userId };
    if (startDate) {
      matchStage.createdAt = { $gte: startDate };
    }

    const [
      sales,
      purchases,
      received,
      paid,
      topCustomerDues,
      topSupplierDues,
      topSalesCustomers,
      topPurchaseSuppliers,
      mostSoldProducts,
      mostPurchasedProducts,
      totalItems,
      lowStockItems,
    ] = await Promise.all([
      Sale.aggregate([
        { $match: matchStage },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
      Purchase.aggregate([
        { $match: matchStage },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
      Transaction.aggregate([
        { $match: { ...matchStage, transactionType: "received" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Transaction.aggregate([
        { $match: { ...matchStage, transactionType: "paid" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),

      Customer.find({ user: userId, balance: { $gt: 0 } })
        .sort({ balance: -1 })
        .limit(5)
        .select("name balance"),
      Supplier.find({ user: userId, balance: { $gt: 0 } })
        .sort({ balance: -1 })
        .limit(5)
        .select("name balance"),

      // Top Customers
      Sale.aggregate([
        { $match: matchStage },
        { $group: { _id: "$customer", total: { $sum: "$totalAmount" } } },
        { $sort: { total: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: "customers",
            localField: "_id",
            foreignField: "_id",
            as: "info",
          },
        },
        { $unwind: "$info" },
      ]),

      // Top Suppliers
      Purchase.aggregate([
        { $match: matchStage },
        { $group: { _id: "$supplier", total: { $sum: "$totalAmount" } } },
        { $sort: { total: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: "suppliers",
            localField: "_id",
            foreignField: "_id",
            as: "info",
          },
        },
        { $unwind: "$info" },
      ]),

      // Most Sold
      Sale.aggregate([
        { $match: matchStage },
        { $unwind: "$products" },
        {
          $group: {
            _id: "$products.product",
            qty: { $sum: "$products.quantity" },
          },
        },
        { $sort: { qty: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: "inventories",
            localField: "_id",
            foreignField: "_id",
            as: "info",
          },
        },
        { $unwind: "$info" },
      ]),

      // Most Purchased
      Purchase.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: "$itemInfo.item",
            totalSpent: {
              $sum: { $multiply: ["$itemInfo.quantity", "$itemInfo.price"] },
            },
          },
        },
        { $sort: { totalSpent: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: "inventories",
            localField: "_id",
            foreignField: "_id",
            as: "info",
          },
        },
        { $unwind: "$info" },
      ]),

      Inventory.countDocuments({ user: userId }),
      Inventory.countDocuments({ user: userId, quantity: { $lt: 10 } }),
    ]);

    res.json({
      totalSales: sales[0]?.total || 0,
      totalPurchases: purchases[0]?.total || 0,
      totalReceived: received[0]?.total || 0,
      totalPaid: paid[0]?.total || 0,
      topCustomerDues,
      topSupplierDues,
      topSalesCustomers,
      topPurchaseSuppliers,
      mostSoldProducts,
      mostPurchasedProducts,
      totalItems,
      lowStockCount: lowStockItems,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

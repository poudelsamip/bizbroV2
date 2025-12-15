import Sale from "../models/Sale.js";
import Purchase from "../models/Purchase.js";
import Transaction from "../models/Transaction.js";
import Customer from "../models/Customer.js";
import Supplier from "../models/Supplier.js";
import Product from "../models/Product.js";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDate = new Date();

    // total sales this month
    const salesThisMonth = await Sale.aggregate([
      {
        $match: {
          user: userId, 
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    // total purchases this month
    const purchasesThisMonth = await Purchase.aggregate([
      {
        $match: {
          user: userId,
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    // total money we received from the customer
    const totalReceivedThisMonth = await Transaction.aggregate([
      {
        $match: {
          user: userId, 
          createdAt: { $gte: startDate, $lte: endDate },
          transactionType: "received",
          type: "Customer",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    // total money paid to supplier
    const totalPaidThisMonth = await Transaction.aggregate([
      {
        $match: {
          user: userId, 
          createdAt: { $gte: startDate, $lte: endDate },
          transactionType: "paid",
          type: "Supplier",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    // total due from customer
    const totalDueFromCustomer = await Customer.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$balance" },
        },
      },
    ]);

    // total due to supplier
    const totalDueToSupplier = await Supplier.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$balance" },
        },
      },
    ]);

    const totalProducts = await Product.countDocuments({ user: userId });

    const recentSale = await Sale.find({ user: userId })
      .populate("customer", "name")
      .sort({ createdAt: -1 })
      .limit(1);

    
    const recentTransaction = await Transaction.find({ user: userId })
      .populate("referenceId", "name businessName")
      .sort({ createdAt: -1 })
      .limit(1);

    res.json({
      totalSalesThisMonth: salesThisMonth[0]?.total || 0,
      totalPurchasesThisMonth: purchasesThisMonth[0]?.total || 0,
      totalReceivedThisMonth: totalReceivedThisMonth[0]?.total || 0,
      totalPaidThisMonth: totalPaidThisMonth[0]?.total || 0,
      totalCustomerDue: totalDueFromCustomer[0]?.total || 0,
      totalSupplierDue: totalDueToSupplier[0]?.total || 0,
      totalItems: totalProducts,
      recentSale: recentSale[0] || null,
      recentTransaction: recentTransaction[0] || null,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
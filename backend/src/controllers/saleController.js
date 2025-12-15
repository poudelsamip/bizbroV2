import Sale from "../models/Sale.js";
import Product from "../models/Product.js";
import Customer from "../models/Customer.js";
import Transaction from "../models/Transaction.js";

export const createSale = async (req, res) => {
  try {
    const { customer: customerId, products, paymentMethod } = req.body;

    if (!customerId || !products || products.length === 0) {
      return res
        .status(400)
        .json({ message: "Customer and items aer required" });
    }

    const customer = await Customer.findOne({
      _id: customerId,
      user: req.user._id,
    });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    let totalAmount = 0;

    for (const p of products) {
      const product = await Product.findOne({
        _id: p.product,
        user: req.user._id,
      });
      if (!product) {
        return res
          .status(404)
          .json({ message: `product not found id: ${p.product}` });
      }

      if (p.quantity > product.quantity) {
        return res.status(400).json({
          message: `not sufficent stock : ${product.name}`,
        });
      }

      product.quantity -= p.quantity;
      await product.save();

      totalAmount += p.quantity * p.price;
    }

    let receivedAmount = 0;
    let dueAmount = 0;
    if (paymentMethod === "credit") {
      receivedAmount = 0;
      dueAmount = totalAmount;
    } else {
      receivedAmount = totalAmount;
      dueAmount = 0;
    }

    const sale = await Sale.create({
      user: req.user._id,
      customer: customer._id,
      products,
      totalAmount,
      receivedAmount,
      dueAmount,
      paymentMethod,
    });

    // add due amount if we sold on credit
    if (dueAmount > 0) {
      customer.balance += dueAmount;
      await customer.save();
    }

    // make transaction if received cash
    if (receivedAmount > 0) {
      await Transaction.create({
        user: req.user._id,
        type: "Customer",
        referenceId: customer._id,
        amount: receivedAmount,
        transactionType: "received",
        remark: `sale id of this sale: ${sale._id}`,
      });
    }

    res.json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find({ user: req.user._id })
      .populate("customer", "businessName balance")
      .populate("products.product", "name")
      .sort({ createdAt: -1 });

    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

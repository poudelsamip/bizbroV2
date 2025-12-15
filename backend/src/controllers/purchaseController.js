import Purchase from "../models/Purchase.js";
import Product from "../models/Product.js";
import Supplier from "../models/Supplier.js";
import Transaction from "../models/Transaction.js";

export const createPurchase = async (req, res) => {
  try {
    const { supplier: supplierId, productInfo, paymentMethod } = req.body;
    if (!supplierId || !productInfo || productInfo.length === 0) {
      return res
        .status(400)
        .json({ message: "Supplier and products required" });
    }

    const supplier = await Supplier.findOne({
      _id: supplierId,
      user: req.user._id,
    });
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    let totalAmount = 0;

    const product = await Product.findOne({
      _id: productInfo.product,
      user: req.user._id,
    });
    if (!product) {
      return res
        .status(404)
        .json({ message: `product not found id: ${product}` });
    }

    product.quantity += productInfo.quantity;
    await product.save();

    totalAmount += productInfo.quantity * product.costPrice;

    let paidAmount = 0;
    let dueAmount = 0;
    if (paymentMethod === "credit") {
      paidAmount = 0;
      dueAmount = totalAmount;
    } else {
      paidAmount = totalAmount;
      dueAmount = 0;
    }

    const purchase = await Purchase.create({
      user: req.user._id,
      supplier: supplier._id,
      itemInfo: {
        item: product._id,
        quantity: productInfo.quantity,
        price: product.costPrice,
      },
      totalAmount,
      paidAmount,
      dueAmount,
      paymentMethod,
    });

    // add due amount if we bought on credit
    if (dueAmount > 0) {
      supplier.balance += dueAmount;
      await supplier.save();
    }

    // make transaction if paid cash
    if (paidAmount > 0) {
      await Transaction.create({
        user: req.user._id,
        type: "Supplier",
        referenceId: supplier._id,
        amount: paidAmount,
        transactionType: "paid",
        remark: `payment of purchse ${purchase._id}`,
      });
    }

    res.json(purchase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({ user: req.user._id })
      .populate("supplier", "name")
      .populate("itemInfo.item", "name");
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addStock = async (req, res) => {
  try {
    const {
      supplier: supplierId,
      product: productId,
      quantity,
      price,
      paymentMethod,
    } = req.body;

    if (!supplierId || !productId || quantity == null || !price) {
      return res.status(400).json({
        message: "fill all required fields",
      });
    }

    const supplier = await Supplier.findOne({
      _id: supplierId,
      user: req.user._id,
    });
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });

    const product = await Product.findOne({
      _id: productId,
      user: req.user._id,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.quantity += quantity;
    product.costPrice = price;
    await product.save();

    const totalAmount = quantity * price;

    let paidAmount = 0;
    let dueAmount = 0;
    if (paymentMethod === "credit") {
      dueAmount = totalAmount;
      supplier.balance += dueAmount;
      await supplier.save();
    } else {
      paidAmount = totalAmount;
    }

    if (paidAmount > 0) {
      await Transaction.create({
        user: req.user._id,
        type: "Supplier",
        referenceId: supplier._id,
        amount: paidAmount,
        transactionType: "paid",
        note: `stock added for product name: ${product.name}`,
      });
    }

    res.status(200).json({ message: "Stock added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import Supplier from "../models/Supplier.js";
import Transaction from "../models/Transaction.js";

export const createSupplier = async (req, res) => {
  try {
    const { name, phone, emali, address } = req.body;

    const supplier = await Supplier.create({
      ...req.body,
      user: req.user._id,
    });
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendPayment = async (req, res) => {
  try {
    const { amount, remark } = req.body;
    const supplier = Supplier.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (amount > supplier.balance) {
      return res.json({ message: "more amount than due amount" });
    }
    supplier.balance = supplier.balance - amount;
    await supplier.save();

    await Transaction.create({
      type: "Supplier",
      referenceId: supplier._id,
      amount,
      transactionType: "paid",
      remark,
      user: req.user._id,
    });
    res.json(`payment sent success. Money sent : ${amount}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

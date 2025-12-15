import Transaction from "../models/Transaction.js";
import Customer from "../models/Customer.js";
import Supplier from "../models/Supplier.js";

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user._id,
    }).populate("referenceId", "name");
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const { type, referenceId, amount, transactionType, remark } = req.body;

    if (!type || !referenceId || !amount || !transactionType) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    let transactiontofrom; //customer or supplier that we received money or paid money
    if (type === "customer") {
      transactiontofrom = await Customer.findOne({
        _id: referenceId,
        user: req.user._id,
      });
    } else if (type === "supplier") {
      transactiontofrom = await Supplier.findOne({
        _id: referenceId,
        user: req.user._id,
      });
    } else {
      return res.status(400).json({ message: "Invalid type" });
    }

    if (!transactiontofrom) {
      return res.status(404).json({ message: `${type} not found` });
    }

    //changing dueamount (balance)
    if (transactionType === "received" && type === "customer") {
      transactiontofrom.balance -= amount;
    } else if (transactionType === "paid" && type === "supplier") {
      transactiontofrom.balance -= amount;
    } else {
      return res.status(400).json({
        message:
          "invalid transaction type. Either receive from customer or paid to supplier is valid",
      });
    }
    await transactiontofrom.save();

    const transaction = await Transaction.create({
      user: req.user._id,
      type: "customer" ? "Customer" : "Supplier",
      referenceId,
      amount,
      transactionType,
      remark,
    });

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

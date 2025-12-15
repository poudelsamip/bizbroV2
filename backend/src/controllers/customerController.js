import Customer from "../models/Customer.js";
import Transaction from "../models/Transaction.js";

export const createCustomer = async (req, res) => {
  try {
    // const { name, businessName, phone, email, address } = req.body;

    const customer = await Customer.create({
      ...req.body,
      user: req.user._id,
    });

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const receivePayment = async (req, res) => {
  try {
    const { amount, remark } = req.body;
    const customer = await Customer.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (amount > customer.balance) {
      return res.json({ message: "more amount than due amount" });
    }
    customer.balance = customer.balance - amount;
    await customer.save();

    await Transaction.create({
      type: "Customer",
      referenceId: customer._id,
      amount,
      transactionType: "received",
      remark,
      user: req.user._id,
    });
    res.json(`payment received success. Money received : ${amount}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

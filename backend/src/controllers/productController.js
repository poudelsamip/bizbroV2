import Product from "../models/Product.js";
import Supplier from "../models/Supplier.js";
import Transaction from "../models/Transaction.js";

export const createProduct = async (req, res) => {
  try {
    const { name, supplier, costPrice, sellingPrice } = req.body;

    const supplierOk = await Supplier.findOne({
      _id: supplier,
      user: req.user._id,
    });
    if (!supplierOk) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    const product = await Product.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id }).populate(
      "supplier",
      "name"
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Item.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    // if (item.quantity > 0) {
    //   return res.status(400).json({
    //     message: "this item has stocks left",
    //   });
    // }

    await product.deleteOne();
    res.json({ message: "product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

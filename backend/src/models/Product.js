import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    costPrice: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const itemModel = mongoose.model("Inventory", ProductSchema);
export default itemModel;

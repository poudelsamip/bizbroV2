import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema(
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
    phone: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    address: {
      type: String,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const supplierModel = mongoose.model("Supplier", SupplierSchema);
export default supplierModel;

import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
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
    businessName: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
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

const customerModel = mongoose.model("Customer", CustomerSchema);
export default customerModel;

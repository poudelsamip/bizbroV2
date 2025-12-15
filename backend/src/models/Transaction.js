import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["Customer", "Supplier"],
      required: true,
    },
    referenceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "type",
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["received", "paid"],
      required: true,
    },
    remark: {
      type: String,
    },
  },
  { timestamps: true }
);

const transactionModel = mongoose.model("Transaction", TransactionSchema);
export default transactionModel;

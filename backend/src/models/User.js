import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verificationCode: String,
    verified: { type: Boolean, default: false },
    // verificationCodeFor: {
    //   type: String,
    //   enum: ["register", "resetpassword", "emailchange"],
    // },
    // verificationCodeExpiryDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

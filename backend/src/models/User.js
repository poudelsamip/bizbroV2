import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    loginProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    password: String,
    googleId: String,
    verificationCode: String,
    verified: { type: Boolean, default: false },
    registered: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

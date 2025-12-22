import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  sendEmailVerificationCode,
  verifyEmailCode,
  resetPassword,
  changeEmail,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", getProfile);
router.post("/sendcode", sendEmailVerificationCode);
router.post("/verifycode", verifyEmailCode);
router.post("/resetpassword", resetPassword);
router.post("/changeemail", protect, changeEmail);

export default router;

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
  googleCallback,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import passport from "passport";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", getProfile);
router.post("/sendcode", sendEmailVerificationCode);
router.post("/verifycode", verifyEmailCode);
router.post("/resetpassword", resetPassword);
router.post("/changeemail", protect, changeEmail);

//google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);
export default router;

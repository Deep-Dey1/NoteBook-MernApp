import express from "express";
import { 
  register, 
  login, 
  getMe, 
  verifyOTP, 
  resendOTP,
  forgotPassword,
  resetPassword
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Local authentication routes
router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.get("/me", protect, getMe);

// Password reset routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;

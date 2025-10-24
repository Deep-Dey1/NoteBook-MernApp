import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateOTP, sendOTPEmail, sendPasswordResetEmail } from "../utils/emailService.js";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Validate password strength
const validatePassword = (password) => {
  const minLength = 7;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  const errors = [];
  
  if (password.length < minLength) {
    errors.push("Password must be at least 7 characters long");
  }
  if (!hasUpperCase) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!hasLowerCase) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!hasNumber) {
    errors.push("Password must contain at least one number");
  }
  if (!hasSpecialChar) {
    errors.push("Password must contain at least one special character");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// @desc    Register new user and send OTP
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({ 
        message: "Password does not meet requirements",
        errors: passwordValidation.errors 
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists && userExists.isVerified) {
      return res.status(400).json({ 
        message: "Email already registered. Please login instead." 
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (userExists && !userExists.isVerified) {
      // User started registration but didn't verify - update their info and resend OTP
      userExists.name = name;
      userExists.password = hashedPassword;
      userExists.otp = otp;
      userExists.otpExpiry = otpExpiry;
      await userExists.save();
    } else {
      // Create new user
      await User.create({
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpiry,
        isVerified: false,
      });
    }

    // Send OTP email
    try {
      await sendOTPEmail(email, name, otp);
      res.status(200).json({
        message: "OTP sent to your email. Please verify to complete registration.",
        email,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      
      // Check if it's a Resend validation error (free tier restriction)
      if (emailError.message && emailError.message.includes("validation_error")) {
        return res.status(400).json({ 
          message: "Email service is in test mode. Currently only deepdey277@gmail.com can register. Please use this email for testing or verify a domain at resend.com/domains for production use." 
        });
      }
      
      return res.status(500).json({ 
        message: "Failed to send OTP email. Please try again." 
      });
    }
  } catch (error) {
    console.error("Error in register controller:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// @desc    Verify OTP and complete registration
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Please provide email and OTP" });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if OTP expired
    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ message: "OTP has expired. Please request a new one." });
    }

    // Verify user
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // Return user data with token
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
      message: "Email verified successfully!",
    });
  } catch (error) {
    console.error("Error in verifyOTP controller:", error);
    res.status(500).json({ message: "Server error during OTP verification" });
  }
};

// @desc    Resend OTP
// @route   POST /api/auth/resend-otp
// @access  Public
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Please provide email" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP email
    await sendOTPEmail(email, user.name, otp);

    res.status(200).json({ message: "New OTP sent to your email" });
  } catch (error) {
    console.error("Error in resendOTP controller:", error);
    res.status(500).json({ message: "Server error while resending OTP" });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // Check for user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(401).json({ message: "Please verify your email first" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    console.error("Error in getMe controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Send OTP for password reset
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({ message: "Please provide email" });
    }

    // Check if user exists and is verified
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No account found with this email" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email first before resetting password" });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Save OTP to user
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send password reset OTP email
    try {
      await sendPasswordResetEmail(email, user.name, otp);
      res.status(200).json({
        message: "Password reset code sent to your email",
        email,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      return res.status(500).json({ 
        message: "Failed to send password reset email. Please try again." 
      });
    }
  } catch (error) {
    console.error("Error in forgotPassword controller:", error);
    res.status(500).json({ message: "Server error during password reset request" });
  }
};

// @desc    Verify OTP and reset password
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Validation
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // Validate new password strength
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      return res.status(400).json({ 
        message: "Password does not meet requirements",
        errors: passwordValidation.errors 
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify OTP
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if OTP is expired
    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ message: "OTP has expired. Please request a new one" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password and clear OTP
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({
      message: "Password reset successful. Please login with your new password.",
    });
  } catch (error) {
    console.error("Error in resetPassword controller:", error);
    res.status(500).json({ message: "Server error during password reset" });
  }
};

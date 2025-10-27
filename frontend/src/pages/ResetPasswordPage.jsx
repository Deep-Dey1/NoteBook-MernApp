import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { KeyRound, ArrowLeft } from "lucide-react";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";

const ResetPasswordPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  // Redirect if no email in state
  useEffect(() => {
    if (!email) {
      toast.error("Please request password reset first");
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only the last digit
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const validatePassword = () => {
    const minLength = newPassword.length >= 7;
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword);

    return minLength && hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpString = otp.join("");

    if (otpString.length !== 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!validatePassword()) {
      toast.error("Password does not meet requirements");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/auth/reset-password", {
        email,
        otp: otpString,
        newPassword,
      });
      
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await axios.post("/auth/forgot-password", { email });
      toast.success("New code sent to your email");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full form-area">
        <div className="card bg-base-100 shadow-xl card-glow">
          <div className="card-body">
            <Link to="/forgot-password" className="btn btn-ghost btn-sm mb-2 w-fit">
              <ArrowLeft className="size-4" />
              Back
            </Link>

            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <KeyRound className="size-8 text-primary" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-2">Reset Password</h2>
              <p className="text-base-content/70">
                Enter the 6-digit code sent to <strong>{email}</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* OTP Input */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Verification Code</span>
                </label>
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="input input-bordered w-12 h-12 text-center text-lg font-bold input-glow"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                  ))}
                </div>
              </div>

              {/* New Password */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="input input-bordered input-glow"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              {/* Password Strength Meter */}
              {newPassword && (
                <div className="mb-4">
                  <PasswordStrengthMeter password={newPassword} />
                </div>
              )}

              {/* Confirm Password */}
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="input input-bordered input-glow"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full mb-4"
                disabled={loading}
              >
                {loading ? "Resetting Password..." : "Reset Password"}
              </button>

              <button
                type="button"
                onClick={handleResendOTP}
                className="btn btn-ghost w-full"
              >
                Didn't receive code? Resend
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

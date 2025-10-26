import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Mail, RefreshCw } from "lucide-react";
import api from "../lib/axios";

const OTPVerification = ({ email, onBack }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  const { loginWithOAuth } = useAuth();
  const navigate = useNavigate();

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split("");
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);

    // Focus last filled input
    const lastIndex = Math.min(pastedData.length, 5);
    document.getElementById(`otp-${lastIndex}`)?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Please enter complete OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/verify-otp", {
        email,
        otp: otpCode,
      });

      localStorage.setItem("token", res.data.token);
      loginWithOAuth(res.data.token);
      toast.success("Email verified successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error(error.response?.data?.message || "Invalid OTP");
      setOtp(["", "", "", "", "", ""]);
      document.getElementById("otp-0")?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await api.post("/auth/resend-otp", { email });
      toast.success("New OTP sent to your email!");
      setTimeLeft(300); // Reset timer
      setOtp(["", "", "", "", "", ""]);
      document.getElementById("otp-0")?.focus();
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <Mail className="size-10 text-primary" />
              </div>
            </div>

            <h2 className="card-title text-2xl font-bold text-center justify-center mb-2">
              Verify Your Email
            </h2>
            <p className="text-center text-base-content/70 mb-6">
              We've sent a 6-digit code to<br />
              <span className="font-semibold">{email}</span>
            </p>

            <form onSubmit={handleSubmit}>
              <div className="flex gap-2 justify-center mb-4" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="input input-bordered w-12 h-14 text-center text-2xl font-bold"
                    autoComplete="off"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <div className="text-center mb-4">
                {timeLeft > 0 ? (
                  <p className="text-sm text-base-content/70">
                    Code expires in{" "}
                    <span className="font-semibold text-primary">{formatTime(timeLeft)}</span>
                  </p>
                ) : (
                  <p className="text-sm text-error">OTP has expired. Please request a new one.</p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full mb-3"
                disabled={loading || otp.join("").length !== 6}
              >
                {loading ? "Verifying..." : "Verify Email"}
              </button>
            </form>

            <button
              onClick={handleResend}
              disabled={resending || timeLeft > 240} // Disable if less than 1 minute passed
              className="btn btn-ghost btn-sm w-full"
            >
              <RefreshCw className={`size-4 ${resending ? "animate-spin" : ""}`} />
              {resending ? "Sending..." : "Resend OTP"}
            </button>

            <button onClick={onBack} className="btn btn-outline btn-sm w-full mt-2">
              Back to Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;

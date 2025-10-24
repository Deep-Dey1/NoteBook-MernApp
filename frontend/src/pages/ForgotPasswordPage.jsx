import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { Mail, ArrowLeft } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/auth/forgot-password", { email });
      toast.success(response.data.message);
      // Navigate to reset password page with email
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <Link to="/login" className="btn btn-ghost btn-sm mb-2 w-fit">
              <ArrowLeft className="size-4" />
              Back to Login
            </Link>

            <h2 className="card-title text-3xl font-bold text-center justify-center mb-2">
              Forgot Password?
            </h2>
            <p className="text-center text-base-content/70 mb-6">
              Enter your email address and we'll send you a code to reset your password.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? "Sending Code..." : "Send Reset Code"}
              </button>
            </form>

            <div className="divider">OR</div>

            <p className="text-center">
              Remember your password?{" "}
              <Link to="/login" className="link link-primary">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

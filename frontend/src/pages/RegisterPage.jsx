import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import OTPVerification from "./OTPVerification";
import { Mail, Lock, User as UserIcon, Eye, EyeOff, ArrowRight } from "lucide-react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success(res.data.message);
      setRegisteredEmail(email);
      setShowOTP(true);
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response?.data?.errors) {
        // Show password validation errors
        error.response.data.errors.forEach((err) => toast.error(err));
      } else {
        toast.error(error.response?.data?.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  if (showOTP) {
    return (
      <OTPVerification
        email={registeredEmail}
        onBack={() => {
          setShowOTP(false);
          setPassword("");
          setConfirmPassword("");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full form-area">
        {/* Logo/Brand */}
        <div className="text-center mb-8 animate-fade-in-down">
          <Link to="/" className="inline-block group">
            <h1 className="text-4xl font-bold text-primary font-mono tracking-tight mb-2 hover:scale-105 transition-all duration-300">
              NoteBook
            </h1>
          </Link>
          <p className="text-base-content/70">Create your account to get started</p>
        </div>

        <div className="card bg-base-100 shadow-2xl border border-base-content/10 animate-fade-in-up card-glow transition-all duration-500">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Input */}
              <div className="form-control animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-transform group-hover:scale-110 duration-300">
                    <UserIcon className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="input input-bordered w-full pl-10 focus:input-primary transition-all hover:scale-[1.02] focus:scale-[1.02] duration-200 input-glow"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="form-control animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-transform group-hover:scale-110 duration-300">
                    <Mail className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="input input-bordered w-full pl-10 focus:input-primary transition-all hover:scale-[1.02] focus:scale-[1.02] duration-200 input-glow"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="form-control animate-slide-in-left" style={{ animationDelay: "0.3s" }}>
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-transform group-hover:scale-110 duration-300">
                    <Lock className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="input input-bordered w-full pl-10 pr-10 focus:input-primary transition-all hover:scale-[1.02] focus:scale-[1.02] duration-200 input-glow"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center transition-transform hover:scale-125 active:scale-95 duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 text-base-content/40 hover:text-base-content/60" />
                    ) : (
                      <Eye className="size-5 text-base-content/40 hover:text-base-content/60" />
                    )}
                  </button>
                </div>
                {password && <PasswordStrengthMeter password={password} />}
              </div>

              {/* Confirm Password Input */}
              <div className="form-control animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
                <label className="label">
                  <span className="label-text font-medium">Confirm Password</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-transform group-hover:scale-110 duration-300">
                    <Lock className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="input input-bordered w-full pl-10 pr-10 focus:input-primary transition-all hover:scale-[1.02] focus:scale-[1.02] duration-200 input-glow"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center transition-transform hover:scale-125 active:scale-95 duration-200"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="size-5 text-base-content/40 hover:text-base-content/60" />
                    ) : (
                      <Eye className="size-5 text-base-content/40 hover:text-base-content/60" />
                    )}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <label className="label">
                    <span className="label-text-alt text-error animate-shake">Passwords do not match</span>
                  </label>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full rounded-full text-base mt-2 animate-fade-in hover:scale-[1.03] active:scale-95 transition-all duration-200 shadow-lg hover:shadow-2xl"
                style={{ animationDelay: "0.5s" }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="divider my-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>OR</div>

            {/* Login Link */}
            <div className="text-center animate-fade-in" style={{ animationDelay: "0.7s" }}>
              <p className="text-base-content/70">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary font-semibold hover:underline hover:scale-105 inline-block transition-transform">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <Link to="/" className="text-sm text-base-content/60 hover:text-primary transition-all hover:scale-105 inline-block">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

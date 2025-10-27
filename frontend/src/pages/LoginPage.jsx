import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

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
          <p className="text-base-content/70">Welcome back! Please login to continue</p>
        </div>

        <div className="card bg-base-100 shadow-2xl border border-base-content/10 animate-fade-in-up card-glow transition-all duration-500">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="form-control animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
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
              <div className="form-control animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-transform group-hover:scale-110 duration-300">
                    <Lock className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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
                <label className="label">
                  <Link to="/forgot-password" className="label-text-alt link link-hover link-primary font-medium">
                    Forgot password?
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full rounded-full text-base animate-fade-in hover:scale-[1.03] active:scale-95 transition-all duration-200 shadow-lg hover:shadow-2xl"
                style={{ animationDelay: "0.3s" }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="divider my-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>OR</div>

            {/* Sign Up Link */}
            <div className="text-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <p className="text-base-content/70">
                Don't have an account?{" "}
                <Link to="/register" className="link link-primary font-semibold hover:underline hover:scale-105 inline-block transition-transform">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Link to="/" className="text-sm text-base-content/60 hover:text-primary transition-all hover:scale-105 inline-block">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

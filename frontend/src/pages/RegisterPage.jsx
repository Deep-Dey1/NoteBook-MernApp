import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import OTPVerification from "./OTPVerification";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

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
      <div className="max-w-md w-full">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold text-center justify-center mb-6">
              Create Account
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <PasswordStrengthMeter password={password} />
              </div>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="input input-bordered"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full mb-4"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Register"}
              </button>
            </form>

            <p className="text-center mt-6">
              Already have an account?{" "}
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

export default RegisterPage;

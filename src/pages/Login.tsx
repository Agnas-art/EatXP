import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import FoodMascot from "@/components/FoodMascot";
import { Sparkles, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sendOTP, verifyOTP, isAuthenticated } = useAuth();

  // States
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(location.state?.message ? "" : "");
  const [successMessage, setSuccessMessage] = useState(location.state?.message || "");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // OTP Timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(interval);
    }
  }, [timer]);

  // Handle Send OTP
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setIsLoading(true);
    const result = await sendOTP(email);

    if (result.success) {
      setOtpSent(true);
      setStep("otp");
      setTimer(300); // 5 minutes
      setSuccessMessage("✅ OTP generated! Open DevTools (F12) → Console tab to see your 6-digit code. Copy and paste it below.");
    } else {
      setError(result.message || "Failed to send OTP");
    }
    setIsLoading(false);
  };

  // Handle Verify OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setIsLoading(true);
    const result = await verifyOTP(email, otp);

    if (result.success) {
      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      setError(result.message || "Invalid OTP");
    }
    setIsLoading(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Mascot */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center mb-8"
        >
          <FoodMascot mood="waving" size="lg" />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-2 mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="font-display text-3xl font-bold text-foreground">
              Welcome Back
            </h1>
            <Sparkles className="w-6 h-6 text-secondary" />
          </div>
          <p className="text-muted-foreground">
            {step === "email"
              ? "Login with your email"
              : "Enter the OTP sent to your email"}
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-2xl p-6 space-y-4"
        >
          {/* Success Message */}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 bg-green-100/20 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg border border-green-200/50"
            >
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{successMessage}</p>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 bg-destructive/10 text-destructive px-4 py-3 rounded-lg"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}

          {/* Email Step */}
          {step === "email" && (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  disabled={isLoading}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </motion.button>
            </form>
          )}

          {/* OTP Step */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" />
                  Enter OTP
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, ""));
                    setError("");
                  }}
                  disabled={isLoading}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50 text-center text-2xl tracking-widest font-mono"
                />
                <div className="text-xs text-muted-foreground text-center pt-2">
                  {timer > 0 ? (
                    <>
                      OTP expires in: <span className="font-semibold text-primary">{formatTime(timer)}</span>
                    </>
                  ) : (
                    "OTP has expired"
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading || timer === 0}
                className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </motion.button>

              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setOtp("");
                  setOtpSent(false);
                  setTimer(0);
                }}
                disabled={isLoading}
                className="w-full text-sm text-primary font-semibold hover:underline"
              >
                Back to Email
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">
                Don't have an account?
              </span>
            </div>
          </div>

          {/* Register Link */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/register")}
            className="w-full border border-primary text-primary font-semibold py-2 rounded-lg hover:bg-primary/10 transition-colors"
          >
            Create New Account
          </motion.button>

          {/* Demo Features Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/features-demo")}
            className="w-full mt-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
          >
            🎉 Try New Features Demo
          </motion.button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-3 gap-3 text-center text-xs text-muted-foreground"
        >
          <div>✨ 9 Languages</div>
          <div>🎤 Voice Bot</div>
          <div>🌍 Multi-lang Support</div>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/5 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />
    </div>
  );
};

export default Login;

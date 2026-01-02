import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Resetpwd = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔁 Restore state after refresh
  useEffect(() => {
    const savedEmail = localStorage.getItem("resetEmail");
    const otpFlag = localStorage.getItem("otpSent");
    const verifiedFlag = localStorage.getItem("otpVerified");

    if (savedEmail) setEmail(savedEmail);
    if (otpFlag === "true") setOtpSent(true);
    if (verifiedFlag === "true") setOtpVerified(true);
  }, []);

  // 📩 Send OTP
  const requestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://myserverapp.tech/otp/pwd-reset-otp-req",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.text();

      if (res.ok) {
        localStorage.setItem("resetEmail", email);
        localStorage.setItem("otpSent", "true");
        setOtpSent(true);
        setMessage("OTP sent to your email");
      } else {
        setMessage(data);
      }
    } catch {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  // 🔐 Verify OTP
  const validateOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://myserverapp.tech/otp/pwd-otp-req-validation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: localStorage.getItem("resetEmail"),
            otp,
          }),
        }
      );

      const data = await res.text();

      if (res.ok) {
        localStorage.setItem("otpVerified", "true");
        setOtpVerified(true);
        setMessage("OTP verified");
      } else {
        setMessage(data);
      }
    } catch {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  // 🔑 Reset Password
  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://myserverapp.tech/otp/pwd-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: localStorage.getItem("resetEmail"),
          password,
        }),
      });

      const data = await res.text();

      if (res.ok) {
        localStorage.removeItem("resetEmail");
        localStorage.removeItem("otpSent");
        localStorage.removeItem("otpVerified");

        setMessage("Password reset successful");
        navigate("/home");
      } else {
        setMessage(data);
      }
    } catch {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      {/* 🔒 Full Screen Loader */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-4">
          Reset Password
        </h2>

        {!otpSent && (
          <form onSubmit={requestOtp} className="space-y-4">
            <input
              className="w-full border p-2 rounded"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Send OTP
            </button>
          </form>
        )}

        {otpSent && !otpVerified && (
          <form onSubmit={validateOtp} className="space-y-4">
            <p className="text-sm text-gray-600">Email: {email}</p>
            <input
              className="w-full border p-2 rounded"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Verify OTP
            </button>
          </form>
        )}

        {otpVerified && (
          <form onSubmit={resetPassword} className="space-y-4">
            <input
              type="password"
              className="w-full border p-2 rounded"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
            >
              Reset Password
            </button>
          </form>
        )}

        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Resetpwd;

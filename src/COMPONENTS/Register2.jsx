import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register2 = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔁 Restore email + otp step after refresh
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const otpFlag = localStorage.getItem("otpSent");

    if (savedEmail) setEmail(savedEmail);
    if (otpFlag === "true") setOtpSent(true);
  }, []);

  // 📩 Request OTP
  const requestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://myserverapp.tech/otp/signup-otp-req", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.text();

      if (res.ok) {
        localStorage.setItem("email", email);
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

  // 🔐 Validate OTP
  const validateOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://myserverapp.tech/otp/signup-otp-validation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: localStorage.getItem("email"),
            otp,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshtoken);

        localStorage.removeItem("email");
        localStorage.removeItem("otpSent");

        navigate("/home");
      } else {
        setMessage(data.message || "OTP validation failed");
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
        <h2 className="text-xl font-semibold text-center mb-4">Register</h2>

        {!otpSent ? (
          <form onSubmit={requestOtp} className="space-y-4">
            <input
              className="w-full border p-2 rounded"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full border p-2 rounded"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              className="w-full border p-2 rounded"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Send OTP
            </button>
          </form>
        ) : (
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

        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Register2;

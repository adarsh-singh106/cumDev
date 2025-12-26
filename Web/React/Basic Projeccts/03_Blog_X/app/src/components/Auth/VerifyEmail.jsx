import React, { useState } from "react";
import { authService } from "../../context/Auth/AuthService"; // Import service directly if no global state needed

const VerifyEmail = ({ onVerifySuccess, emailToVerify }) => {
  // 1. LOCAL STATE: The 4 digit code
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    // Auto-focus next input
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = code.join(""); // Combine array into string "1234"

    try {
      // Call API
      await authService.verifyEmail(token);
      // 2. COMMUNICATION: Tell Parent we are done
      onVerifySuccess();
    } catch (err) {
      setError("Verification failed. Invalid code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-full text-center h-full justify-center px-10 animate-fadeIn"
    >
      <div className="w-16 h-16 rounded-full border-2 border-[#3BB19B] flex items-center justify-center text-[#3BB19B] mb-4">
        {/* SVG Icon... */}
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>

      <h1 className="font-bold text-3xl mb-2 text-white">Verify Email</h1>
      <p className="text-gray-400 text-sm mb-6">
        Enter the code sent to your email.
      </p>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex gap-3 mb-6">
        {code.map((digit, i) => (
          <input
            key={i}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target, i)}
            onFocus={(e) => e.target.select()}
            className="w-12 h-12 text-center text-xl font-bold bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3BB19B]"
          />
        ))}
      </div>

      <button
        disabled={loading}
        className="rounded-full border border-[#3BB19B] bg-[#3BB19B] text-white text-xs font-bold py-3 px-11 uppercase tracking-wider transform transition-transform active:scale-95 focus:outline-none hover:bg-[#2a8f7d]"
      >
        {loading ? "Verifying..." : "Verify Account"}
      </button>

      <button
        type="button"
        className="mt-6 text-gray-400 text-xs hover:text-[#3BB19B] transition cursor-pointer bg-transparent border-none"
      >
        Didn't receive code? <strong>Resend</strong>
      </button>
    </form>
  );
};

export default VerifyEmail;

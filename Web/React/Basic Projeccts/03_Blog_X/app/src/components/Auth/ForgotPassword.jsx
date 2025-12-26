import React, { useState } from "react";
// import { authService } from ... (If you have this service function)

const ForgotPassword = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false); // Fixed typo (setsubmitted -> setSubmitted)
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    // await authService.forgotPassword(email);
    
    setTimeout(() => {
        setSubmitted(true);
        setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full text-center h-full justify-center px-10 animate-fadeIn">
      <div className="w-16 h-16 rounded-full border-2 border-[#3BB19B] flex items-center justify-center text-[#3BB19B] mb-4">
        {/* SVG Icon */}
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
      </div>

      <h1 className="font-bold text-3xl mb-2 text-white">Forgot Password?</h1>

      {/* CONDITIONAL RENDERING: Show Form OR Success Message */}
      {!submitted ? (
        <>
          <p className="text-gray-400 text-sm mb-6">
            Enter your email and we'll send you a link to reset your password.
          </p>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            // FIX: Connect the input to state
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-800 text-white border-none p-3 my-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-[#3BB19B]"
          />

          <button className="rounded-full border border-[#3BB19B] bg-[#3BB19B] text-white text-xs font-bold py-3 px-11 uppercase tracking-wider transform transition-transform active:scale-95 focus:outline-none mt-4 hover:bg-[#2a8f7d]">
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </>
      ) : (
        <div className="bg-gray-800 p-4 rounded-lg mt-4">
            <p className="text-[#3BB19B] font-bold">Email Sent!</p>
            <p className="text-gray-400 text-xs">Check {email} for instructions.</p>
        </div>
      )}

      <button
        type="button"
        onClick={onBack}
        className="mt-6 text-gray-400 text-xs hover:text-[#3BB19B] transition cursor-pointer bg-transparent border-none"
      >
        &larr; Back to Sign In
      </button>
    </form>
  );
};

export default ForgotPassword;
import React, { useState } from "react";
import { useAuth } from "../../context/Auth/AuthContext"; 
import SocialIcon from "./SocialIcon";

const SignInForm = ({ onForgotPassword }) => {
  const { login } = useAuth(); // Get the global login function

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      // 1. Call the Global Login function
      await login(formData.email, formData.password);
      // Note: No need to navigate here usually, the AuthContext 
      // updates 'user', causing the main App to redirect to Dashboard.
    } catch (err) {
      // 2. Handle Errors safely
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full text-center h-full justify-center px-10">
      <h1 className="font-bold text-3xl mb-0 text-white">Sign in to Blog-X</h1>

      <div className="flex my-5 space-x-3">
        <SocialIcon icon="f" />
        <SocialIcon icon="G+" />
        <SocialIcon icon="in" />
      </div>

      <span className="text-xs text-gray-400 mb-4">or use your email account</span>

      {/* 3. SHOW ERROR MESSAGE IF EXISTS */}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="bg-gray-800 text-white border-none p-3 my-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-[#3BB19B]"
      />
      <input
        type="password"
        name="password" // <-- CRITICAL FIX: Was missing
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="bg-gray-800 text-white border-none p-3 my-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-[#3BB19B]"
      />

      <button
        type="button"
        onClick={onForgotPassword}
        className="text-gray-400 text-sm no-underline my-4 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
      >
        Forgot your password?
      </button>

      <button
        disabled={loading}
        className="rounded-full border border-[#3BB19B] bg-[#3BB19B] text-white text-xs font-bold py-3 px-11 uppercase tracking-wider transform transition-transform active:scale-95 focus:outline-none hover:bg-[#2a8f7d]"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
};

export default SignInForm;
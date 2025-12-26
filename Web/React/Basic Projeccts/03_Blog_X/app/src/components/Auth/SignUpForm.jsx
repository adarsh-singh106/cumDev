import React, { useState } from "react";
import { useAuth } from "../../context/Auth/AuthContext";
import SocialIcon from "./SocialIcon";

const SignUpForm = ({ onRegisterSuccess }) => {
  const { register } = useAuth(); // Get global register function

  const [formData, setFormData] = useState({
    name: "",
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
    setError("");

    try {
      // 1. Call API
      await register(formData);
      // 2. On Success -> Tell Parent to switch to Verify View
      onRegisterSuccess();
    } catch (err) {
      const msg = err.response?.data?.message || "Registration Failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-full text-center h-full justify-center px-10"
    >
      <h1 className="font-bold text-3xl mb-0 text-white">Create Account</h1>

      <div className="flex my-5 space-x-3">
        <SocialIcon icon="f" />
        <SocialIcon icon="G+" />
        <SocialIcon icon="in" />
      </div>

      <span className="text-xs text-gray-400 mb-4">
        or use your email for registration
      </span>

      {/* Show Error */}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <input
        name="name"
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="bg-gray-800 text-white border-none p-3 my-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-[#3BB19B]"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="bg-gray-800 text-white border-none p-3 my-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-[#3BB19B]"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="bg-gray-800 text-white border-none p-3 my-2 w-full rounded focus:outline-none focus:ring-1 focus:ring-[#3BB19B]"
      />

      <button className="rounded-full border border-[#3BB19B] bg-[#3BB19B] text-white text-xs font-bold py-3 px-11 uppercase tracking-wider transform transition-transform active:scale-95 focus:outline-none mt-4 hover:bg-[#2a8f7d]">
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUpForm;
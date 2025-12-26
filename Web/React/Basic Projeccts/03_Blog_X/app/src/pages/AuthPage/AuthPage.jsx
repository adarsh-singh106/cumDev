import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
// 🔧 CHANGE 1: Use toast instead of alert (better UX, non-blocking)

// Auth Components
import SignInForm from "../../components/Auth/SignInForm";
import SignUpForm from "../../components/Auth/SignUpForm";
import VerifyEmail from "../../components/Auth/VerifyEmail";
import ForgotPassword from "../../components/Auth/ForgotPassword";

// 🔧 CHANGE 2: Centralized subView constants to avoid magic strings
const SUB_VIEWS = {
  DEFAULT: "default",
  FORGOT: "forgot",
  VERIFY: "verify",
};

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔧 CHANGE 3: Derive initial auth mode cleanly from URL
  const [isSignUp, setIsSignUp] = useState(location.pathname === "/register");

  // 🔧 CHANGE 4: Use constants instead of raw strings
  const [subView, setSubView] = useState(SUB_VIEWS.DEFAULT);

  // 🔧 CHANGE 5: Sync UI with URL changes (prevents stale states on refresh/back)
  useEffect(() => {
    if (location.pathname === "/register") {
      setIsSignUp(true);
    } else {
      setIsSignUp(false);
    }

    // Always reset sub-view when route changes
    setSubView(SUB_VIEWS.DEFAULT);
  }, [location.pathname]);

  // 🔧 CHANGE 6: Toggle only handles navigation (URL drives state)
  const handleToggle = () => {
    navigate(isSignUp ? "/login" : "/register");
  };

  // 🔧 CHANGE 7: Extracted handlers for clarity + reuse
  const handleRegisterSuccess = () => {
    setSubView(SUB_VIEWS.VERIFY);
  };

  const handleVerifySuccess = () => {
    toast.success("Email verified! Please login."); // better UX than alert
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen bg-black font-sans text-white">
      <div className="relative overflow-hidden w-3xl max-w-full min-h-120 bg-gray-900 rounded-[20px] shadow-[0_14px_28px_rgba(0,0,0,0.5),0_10px_10px_rgba(0,0,0,0.5)]">
        {/* --- SIGN UP CONTAINER --- */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 flex flex-col justify-center items-center bg-gray-900 transition-all duration-500 ease-in-out
          ${isSignUp ? "translate-x-full opacity-100 z-50" : "opacity-0 z-10"}`}
        >
          {subView === SUB_VIEWS.VERIFY ? (
            <VerifyEmail
              onVerifySuccess={handleVerifySuccess}
              onResend={() => toast.success("Verification code resent")}
              // 🔧 CHANGE 8: Replaced alert with toast
            />
          ) : (
            <SignUpForm onRegisterSuccess={handleRegisterSuccess} />
          )}
        </div>

        {/* --- SIGN IN CONTAINER --- */}
        <div
          className={`absolute top-0 left-0 h-full w-1/2 flex flex-col justify-center items-center bg-gray-900 z-20 transition-all duration-500 ease-in-out
          ${isSignUp ? "translate-x-full" : ""}`}
        >
          {subView === SUB_VIEWS.FORGOT ? (
            <ForgotPassword onBack={() => setSubView(SUB_VIEWS.DEFAULT)} />
          ) : (
            <SignInForm onForgotPassword={() => setSubView(SUB_VIEWS.FORGOT)} />
          )}
        </div>

        {/* --- OVERLAY CONTAINER --- */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-500 ease-in-out z-100 rounded-l-[50px]
          ${
            isSignUp ? "-translate-x-full rounded-l-none rounded-r-[50px]" : ""
          }`}
        >
          <div
            className={`bg-linear-to-r from-[#3BB19B] to-[#20B2AA] text-white relative -left-full h-full w-[200%] transform transition-transform duration-500 ease-in-out
            ${isSignUp ? "translate-x-1/2" : "translate-x-0"}`}
          >
            {/* Left Overlay Panel */}
            <div
              className={`absolute top-0 flex flex-col items-center justify-center h-full w-1/2 px-10 text-center transform transition-transform duration-500 ease-in-out
              ${isSignUp ? "translate-x-0" : "-translate-x-[20%]"}`}
            >
              <h1 className="font-bold text-3xl mb-0">Welcome Back!</h1>
              <p className="text-sm font-thin leading-5 tracking-wide my-5 text-gray-100">
                Enter your personal details and start journey with us
              </p>
              <button
                className="bg-transparent border border-white text-white rounded-full text-xs font-bold py-3 px-11 uppercase tracking-wider active:scale-95 focus:outline-none hover:bg-white/20 transition-colors cursor-pointer"
                onClick={handleToggle}
              >
                Sign In
              </button>
            </div>

            {/* Right Overlay Panel */}
            <div
              className={`absolute top-0 right-0 flex flex-col items-center justify-center h-full w-1/2 px-10 text-center transform transition-transform duration-500 ease-in-out
              ${isSignUp ? "translate-x-[20%]" : "translate-x-0"}`}
            >
              <h1 className="font-bold text-3xl mb-0">Hello, Friend!</h1>
              <p className="text-sm font-thin leading-5 tracking-wide my-5 text-gray-100">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="bg-transparent border border-white text-white rounded-full text-xs font-bold py-3 px-11 uppercase tracking-wider active:scale-95 focus:outline-none hover:bg-white/20 transition-colors cursor-pointer"
                onClick={handleToggle}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

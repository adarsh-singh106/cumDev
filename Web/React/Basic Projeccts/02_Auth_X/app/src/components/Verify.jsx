import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext"; 

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { verifyEmail, state, dispatch } = useAuth();
  const { verificationStatus, verificationMessage } = state;

  const hasCalledAPI = useRef(false);

  // 1. Trigger Verification
  useEffect(() => {
    // Only call if we have a token, it's idle, and we haven't called it yet
    if (token && verificationStatus === 'idle' && !hasCalledAPI.current) {
      hasCalledAPI.current = true;
      verifyEmail(token);
    }

    // Cleanup: Reset ONLY when the component unmounts (user leaves page)
    return () => {
        dispatch({ type: "VERIFY_RESET" }); 
    };

    // 🛑 CRITICAL FIX: Dependencies are ONLY [token]
    // We removed 'verifyEmail' and 'dispatch' to stop the infinite loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]); 

  // 2. Redirect on Success
  useEffect(() => {
    if (verificationStatus === 'success') {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [verificationStatus, navigate]);

  const isSuccess = verificationStatus === 'success';
  const isError = verificationStatus === 'error';

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 px-4">
      <div className={`p-8 rounded shadow-md text-center bg-white max-w-sm w-full border-t-4 ${isSuccess ? "border-green-500" : isError ? "border-red-500" : "border-blue-500"}`}>
        
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {isSuccess ? "Verified!" : isError ? "Verification Failed" : "Verifying..."}
        </h2>
        
        <p className={`text-lg ${isSuccess ? "text-green-600" : isError ? "text-red-500" : "text-gray-600"}`}>
          {verificationMessage}
        </p>

        {isSuccess && <p className="text-sm text-gray-400 mt-4">Redirecting to login...</p>}
      </div>
    </div>
  );
};

export default Verify;
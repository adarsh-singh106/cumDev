import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// 1. Initial State
const initialState = {
  signState: "SignUp",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  error: "",
  loading: false,
  // New Verification State
  verificationStatus: "idle", // 'idle' | 'loading' | 'success' | 'error'
  verificationMessage: "",
};

// 2. Reducer Logic
const authReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_MODE":
      return {
        ...state,
        signState: state.signState === "SignUp" ? "SignIn" : "SignUp",
        error: "",
      };
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "RESET_FORM":
      return {
        ...state,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        error: "",
        loading: false,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "SUBMIT_START":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "SWITCH_MODE":
      return {
        ...state,
        signState: action.payload, // Forces 'SignIn' or 'SignUp'
        error: "",
      };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
      };
    // --- NEW VERIFICATION CASES ---
    case "VERIFY_START":
      return {
        ...state,
        verificationStatus: "loading",
        verificationMessage: "Verifying your email...",
      };
    case "VERIFY_SUCCESS":
      return {
        ...state,
        verificationStatus: "success",
        verificationMessage: action.payload,
      };
    case "VERIFY_FAIL":
      return {
        ...state,
        verificationStatus: "error",
        verificationMessage: action.payload,
      };
    // 👇 ADD THIS LINE
    case "VERIFY_RESET":
      return { ...state, verificationStatus: "idle", verificationMessage: "" };
    default:
      return state;
  }
};

// 3. Creating Context
const AuthContext = createContext();

// 4. Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // --- FIX START: submitForm must be INSIDE AuthProvider ---
  const submitForm = async (e) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT_START" });

    // Validation Check
    const { signState, firstName, lastName, email, password } = state;

    if (signState === "SignUp") {
      if (!firstName || !lastName || !email || !password) {
        dispatch({ type: "SET_ERROR", payload: "Please fill all the fields" });
        return;
      }
    } else {
      if (!email || !password) {
        dispatch({ type: "SET_ERROR", payload: "Please fill all fields" });
        return;
      }
    }

    // Api Call
    try {
      const payload = { email, password };

      // Default URL for Login
      let url = "http://localhost:3001/api/users/login";

      // If SignUp, add names and change URL
      if (signState === "SignUp") {
        payload.firstName = firstName;
        payload.lastName = lastName;
        url = "http://localhost:3001/api/users/register";
      }

      const response = await axios.post(url, payload);

      // ✅ SECURITY FIX: Only save user if it is a LOGIN action
      if (signState === "SignIn" && response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      dispatch({ type: "SUBMIT_SUCCESS" });
      dispatch({ type: "RESET_FORM" });
      // 3. UX IMPROVEMENT:
      // If they just Registered, switch to "SignIn" mode automatically
      if (signState === "SignUp") {
        toast.success("Email Sent! Please check your email For Verification.");
        dispatch({ type: "SWITCH_MODE", payload: "SignIn" });
      } else {
        // If they just Logged In, they usually get redirected to Dashboard
        // (You handled this via navigate in the Component, or you can do it here)
        toast.success("Logged In Successfully!");
      }
    } catch (error) {
      console.log(error);
      // It is good practice to check if error.response.data.message exists
      const msg = error.response?.data?.message || "Failed to Submit Data";
      dispatch({ type: "SET_ERROR", payload: msg });
    }
  };
  // --- FIX END ---
  // --- NEW FUNCTION: Verify Email ---
  const verifyEmail = async (token) => {
    dispatch({ type: "VERIFY_START" });
    try {
      // FIX: Ensure this is Port 3001
      const response = await axios.post(
        "http://localhost:3001/api/users/verify",
        { token }
      );
      dispatch({ type: "VERIFY_SUCCESS", payload: response.data.message });
    } catch (error) {
      const msg = error.response?.data?.message || "Verification Failed";
      dispatch({ type: "VERIFY_FAIL", payload: msg });
    }
  };

  // Return must happen at the end of the Component function
  return (
    <AuthContext.Provider value={{ state, dispatch, submitForm, verifyEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

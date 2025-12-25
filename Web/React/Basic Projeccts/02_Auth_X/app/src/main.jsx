import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 1. Router acts as the base infrastructure */}
    <BrowserRouter>
    {/* Place Toaster at the top level */}
      <Toaster position="top-center" reverseOrder={false} />
      {/* 2. All Global Providers go here, INSIDE Router */}
      <AuthProvider>
        {/* 3. Finally, the App renders */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

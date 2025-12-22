import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // <-- IMPORT THIS
import "./index.css";
import App from "./App.jsx";
import { BlogProvider } from "./context/BlogContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BlogProvider>
      {/* WRAP YOUR APP IN BROWSERROUTER */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BlogProvider>
  </StrictMode>
);

import React from "react";
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes"; // Import your routes file

function App() {
  return (
    <div>
      <Header />

      {/* Instead of <Home/>, we render the Routes component */}
      <AppRoutes />
    </div>
  );
}

export default App;

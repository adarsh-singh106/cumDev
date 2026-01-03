// Pages/Dashboard.jsx
import InputPage from "@/components/InputPage";
import TablePage from "@/components/TablePage";
import React from "react";

const Dashboard = () => {
  return (
    // 1. h-screen or h-full to make sure the container is big enough
    // 2. p-4 adds some padding around the edges
    <div className="h-screen w-full p-4">
      <h1 className="text-xl mb-4 text-center font-extrabold">My Dashboard</h1>

      {/* This container holds your page content */}
      <div className="flex flex-col md:flex-row h-full gap-4">
        {/* LEFT / TOP SECTION (InputPage) */}
        {/* flex-1 means "take up 1 unit of available space" */}
        <div className="flex-1 w-full h-[250px] border rounded-lg overflow-hidden">
          <InputPage />
        </div>
        {/* RIGHT / BOTTOM SECTION (TablePage) */}
        {/* flex-1 means "take up 1 unit of available space" (Equal to the one above) */}
        <div className="flex-1 w-full border rounded-lg overflow-hidden">
          <TablePage />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

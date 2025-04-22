import React from "react";
import { Outlet } from "react-router-dom";
import OwnerSidebar from "../components/layout/OwnerSidebar";
import OwnerHeader from "../components/layout/OwnerHeader";
function OwnerLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <OwnerSidebar />
      <main className="flex-1 ml-64 bg-gray-100 pt-20 px-6">
        <OwnerHeader />
        <Outlet />
      </main>
    </div>
  );
}

export default OwnerLayout;

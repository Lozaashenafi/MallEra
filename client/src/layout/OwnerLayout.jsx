import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import OwnerSidebar from "../components/layout/OwnerSidebar";
import OwnerHeader from "../components/layout/OwnerHeader";
function OwnerLayout({ user }) {
  return (
    <>
      <div className="flex min-h-screen w-full">
        <OwnerSidebar />
        <main className="flex-1 ml-60 bg-gray-100 p-6">
          <OwnerHeader />
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default OwnerLayout;

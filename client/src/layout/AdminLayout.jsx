import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/layout/SideBar";
import AdminHeader from "../components/layout/AdminHeader";

function AdminLayout() {
  return (
    <div className="flex h-screen w-full">
      <SideBar />
      <main className="flex-1 bg-gray-100 p-6">
        <AdminHeader />
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;

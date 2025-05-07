import React from "react";
import { Link, useLocation } from "react-router-dom";

function SideBar() {
  const menuItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Mall Owner Management", path: "/admin/mall-owners" },
    { name: "Mall Management", path: "/admin/malls" },
    { name: "Mall  Requests", path: "/admin/pending/malls" },
    { name: "Subscription ", path: "/admin/subscription" },
  ];

  const location = useLocation();
  return (
    <aside className="w-60 bg-red-700 text-white flex flex-col p-5 h-full fixed overflow-y-auto">
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2 text-lg font-bold">
          <div className="w-8 h-8 bg-white rounded-md"></div>
          <span>MallSpot</span>
        </div>
        <span className="text-sm">Admin Dashboard</span>
      </div>
      <nav className="mt-5 flex flex-col gap-2 flex-grow overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`text-left px-4 py-2 rounded-md transition-colors ${
              location.pathname === item.path
                ? "bg-red-500"
                : "hover:bg-red-600"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default SideBar;

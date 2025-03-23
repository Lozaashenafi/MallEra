import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiDollarSign,
  FiSettings,
  FiChevronDown,
  FiInfo,
} from "react-icons/fi";
import { MdMeetingRoom } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";

function OwnerSidebar() {
  const location = useLocation();
  const [tenantOpen, setTenantOpen] = useState(false);
  const [roomOpen, setRoomOpen] = useState(false);
  const { userData } = useAuth();

  return (
    <aside className="w-64 bg-cyan-900 text-white h-screen fixed flex flex-col shadow-lg p-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-white rounded-md"></div>
        <div>
          <h2 className="text-lg font-semibold">
            {userData.mallName || "Mall Spot"}
          </h2>
          <p className="text-sm text-cyan-200">Mall Owner Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 flex-grow overflow-y-auto">
        <SidebarLink to="/owner" icon={<FiHome />} label="Dashboard" />
        <SidebarLink to="/owner/info" icon={<FiInfo />} label="Mall Info" />
        <SidebarDropdown
          label="Manage Room"
          icon={<MdMeetingRoom />}
          isOpen={roomOpen}
          toggleOpen={() => setRoomOpen(!roomOpen)}
        >
          <SidebarLink to="/owner/room/add" label="Add Room" />
          <SidebarLink to="/owner/room/list" label="Room List" />
          <SidebarLink to="/owner/room/price" label="Room Price" />
        </SidebarDropdown>
        <SidebarLink
          to="/owner/tenant"
          icon={<FiUsers />}
          label="Manage Tenant"
        />
        <SidebarLink to="/owner/rent" icon={<FiUsers />} label="Manage Rent" />
        <SidebarLink
          to="/owner/payment"
          icon={<FiDollarSign />}
          label="Payment"
        />
        <SidebarLink
          to="/owner/settings"
          icon={<FiSettings />}
          label="Settings"
        />
      </nav>
    </aside>
  );
}

function SidebarLink({ to, icon, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
        isActive ? "bg-cyan-700" : "hover:bg-cyan-800"
      }`}
    >
      {icon} <span>{label}</span>
    </Link>
  );
}

function SidebarDropdown({ label, icon, isOpen, toggleOpen, children }) {
  return (
    <div>
      <button
        onClick={toggleOpen}
        className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-cyan-800"
      >
        <span className="flex items-center gap-3">
          {icon} {label}
        </span>
        <FiChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && <div className="ml-6 flex flex-col gap-1">{children}</div>}
    </div>
  );
}

export default OwnerSidebar;

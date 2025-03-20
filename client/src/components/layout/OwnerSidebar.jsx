import React, { useEffect, useState } from "react";
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
import { getMallName } from "../../api/mall";
import { useAuth } from "../../context/AuthContext";

function OwnerSidebar() {
  const location = useLocation();
  const [tenantOpen, setTenantOpen] = useState(false);
  const [roomOpen, setRoomOpen] = useState(false);
  const [mallName, setMallName] = useState("MallSpot");
  const { userData } = useAuth();

  useEffect(() => {
    const fetchMalls = async () => {
      try {
        const data = await getMallName(userData.mallId);
        if (data.success) {
          setMallName(data.mallName); // Update state with fetched malls
        }
      } catch (error) {
        console.error("Error fetching malls:", error.message);
        toast.error(error.message);
      }
    };
    fetchMalls();
  }, []);

  return (
    <aside className="w-60 bg-cyan-900 text-white flex flex-col p-5 h-full fixed overflow-y-auto">
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2 text-lg font-bold">
          <div className="w-8 h-8 bg-white rounded-md"></div>
          <span>{mallName}</span>
        </div>
        <span className="text-sm">Mall Owner Dashboard</span>
      </div>
      <nav className="mt-5 flex flex-col gap-2 flex-grow overflow-y-auto">
        <Link
          to="/owner"
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            location.pathname === "/owner"
              ? "text-cyan-400"
              : "hover:text-cyan-700"
          }`}
        >
          <FiHome /> Dashboard
        </Link>

        <Link
          to="/owner/info"
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            location.pathname === "/owner/info"
              ? "text-cyan-400"
              : "hover:text-cyan-700"
          }`}
        >
          <FiInfo /> Mall Info
        </Link>

        <div>
          <button
            onClick={() => setTenantOpen(!tenantOpen)}
            className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:text-cyan-700"
          >
            <span className="flex items-center gap-2">
              <FiUsers /> Manage Tenant
            </span>
            <FiChevronDown
              className={`transition-transform ${
                tenantOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {tenantOpen && (
            <div className="ml-6 flex flex-col">
              <Link
                to="/owner/tenant/add"
                className="px-4 py-2 hover:text-cyan-700"
              >
                Add Tenant
              </Link>
              <Link
                to="/owner/tenant/list"
                className="px-4 py-2 hover:text-cyan-700"
              >
                Tenant List
              </Link>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => setRoomOpen(!roomOpen)}
            className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:text-cyan-700"
          >
            <span className="flex items-center gap-2">
              <MdMeetingRoom /> Manage Room
            </span>
            <FiChevronDown
              className={`transition-transform ${roomOpen ? "rotate-180" : ""}`}
            />
          </button>
          {roomOpen && (
            <div className="ml-6 flex flex-col">
              <Link
                to="/owner/room/add"
                className="px-4 py-2 hover:text-cyan-700"
              >
                Add Room
              </Link>
              <Link
                to="/owner/room/list"
                className="px-4 py-2 hover:text-cyan-700"
              >
                Room List
              </Link>
              <Link
                to="/owner/room/price"
                className="px-4 py-2 hover:text-cyan-700"
              >
                Room Price
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/owner/payment"
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            location.pathname === "/owner/payment"
              ? "text-cyan-400"
              : "hover:text-cyan-700"
          }`}
        >
          <FiDollarSign /> Payment
        </Link>

        <Link
          to="/owner/settings"
          className="flex items-center gap-2 px-4 py-2 rounded-md hover:text-cyan-700"
        >
          <FiSettings /> Settings
        </Link>
      </nav>
    </aside>
  );
}

export default OwnerSidebar;

import { Search } from "lucide-react";
import React from "react";

function AdminHeader() {
  return (
    <header className="flex justify-between items-center">
      <div className="relative">
        <Search className="absolute left-3 top-2 text-gray-500" size={18} />
        <input
          type="text"
          placeholder="Search your courses"
          className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      <div className="flex gap-4">
        <button className="text-red-700 font-semibold">Home</button>
        <button className="text-red-700 font-semibold">Logout</button>
      </div>
    </header>
  );
}

export default AdminHeader;

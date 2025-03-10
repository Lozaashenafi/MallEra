import React from "react";
import MallOwnerTable from "../../components/admin/MallOwnerTable";
import { Link } from "react-router-dom"; // Correct import

function MallOwner() {
  return (
    <section className="mt-6">
      <h1 className="text-xl font-bold">Mall Owners</h1>
      <div className="mt-4 p-6 bg-white shadow-md rounded-lg">
        <div className="w-3xs">
          <Link
            to="/admin/mall-owners/add"
            className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800"
          >
            Add New
          </Link>
        </div>
        <MallOwnerTable />
      </div>
    </section>
  );
}

export default MallOwner;

import React from "react";
import { Link } from "react-router-dom";

function Mall() {
  const malls = [
    {
      name: "Sunset Mall",
      description:
        "A premium shopping destination featuring high-end fashion brands, restaurants, and entertainment options.",
      address: "123 Main Street, Los Angeles, CA",
    },
    {
      name: "Greenwood Plaza",
      description:
        "A family-friendly mall with a variety of retail stores, food courts, and a spacious kids' play area.",
      address: "456 Oak Avenue, Denver, CO",
    },
  ];
  return (
    <section className="mt-6">
      <h1 className="text-xl font-bold">Mall</h1>
      <div className="mt-4 p-6 bg-white shadow-md rounded-lg ">
        <div className="w-3xs mb-6">
          <Link
            to="register"
            className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800"
          >
            Register New Mall
          </Link>
        </div>
        <div className="max-w-5xl w-full space-y-6">
          {malls.map((mall, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg flex items-center shadow-lg transition transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="w-40 h-40 bg-gray-200 rounded-md flex items-center justify-center">
                <span className="text-gray-500">Image</span>
              </div>
              <div className="flex-1 ml-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {mall.name}
                </h2>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  {mall.description}
                </p>
                <p className="text-gray-500 mt-2 font-medium">
                  📍 {mall.address}
                </p>
              </div>
              <Link
                to={"detail"}
                className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Mall;

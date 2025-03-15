const backendURL = import.meta.env.VITE_API_URL;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMall } from "../../api/mall";

function Mall() {
  const [malls, setMalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMalls = async () => {
      try {
        const data = await getMall();
        if (data.success) {
          setMalls(data.malls); // Update state with fetched malls
        }
      } catch (error) {
        console.error("Error fetching malls:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMalls();
  }, []);

  return (
    <section className="mt-6">
      <h1 className="text-xl font-bold">Mall</h1>
      <div className="mt-4 p-6 bg-white shadow-md rounded-lg">
        <div className="w-3xs mb-6">
          <Link
            to="register"
            className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800"
          >
            Register New Mall
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading malls...</p>
        ) : malls.length === 0 ? (
          <p className="text-center text-gray-500">No malls found.</p>
        ) : (
          <div className="max-w-5xl w-full space-y-6">
            {malls.map((mall) => (
              <div
                key={mall.id}
                className="bg-white p-6 rounded-lg flex items-center shadow-lg transition transform hover:scale-105 hover:shadow-2xl"
              >
                <div className="w-40 h-40 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                  {mall.image ? (
                    <img
                      src={`${backendURL}${mall.image}`}
                      alt={mall.mallName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </div>
                <div className="flex-1 ml-6">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {mall.mallName}
                  </h2>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    {mall.description}
                  </p>
                  <p className="text-gray-500 mt-2 font-medium">
                    📍 {mall.address}
                  </p>
                </div>
                <Link
                  to={`/admin/mall/detail/${mall.id}`} // Pass mall ID dynamically
                  className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Mall;

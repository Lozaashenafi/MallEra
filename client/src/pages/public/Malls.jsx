// Malls.jsx
import React, { useEffect, useState } from "react";
import { getMall } from "../../api/mall";
import { useNavigate } from "react-router-dom"; // 👈 Add this

const backendURL = import.meta.env.VITE_API_URL;

const Malls = () => {
  const [malls, setMalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // 👈 Initialize navigate

  useEffect(() => {
    const fetchMalls = async () => {
      try {
        const data = await getMall();
        if (data.success) {
          setMalls(data.malls);
        }
      } catch (error) {
        console.error("Error fetching malls:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMalls();
  }, []);

  const handleMallClick = (mallId) => {
    navigate(`/tenants/${mallId}`); // 👈 Navigate to tenants page with mallId
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl items-center font-bold text-orange-700 mb-8">
        Malls
      </h1>

      {loading ? (
        <div className="text-center text-gray-500 text-lg">
          Loading malls...
        </div>
      ) : malls.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No malls available.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {malls.map((mall) => (
            <div
              key={mall.id}
              onClick={() => handleMallClick(mall.id)}
              className="bg-white shadow-lg rounded-2xl overflow-hidden transition hover:shadow-xl duration-300 cursor-pointer"
            >
              <img
                src={`${backendURL}${mall.image}`}
                alt={mall.mallName}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-2xl font-semibold text-orange-700 mb-2">
                  {mall.mallName}
                </h2>
                <p className="text-gray-600 mb-2 line-clamp-2">
                  {mall.description}
                </p>
                <p className="text-sm text-gray-500 flex items-center">
                  📍 <span className="ml-1">{mall.address}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Malls;

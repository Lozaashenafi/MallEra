// Tenants.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRentByMallId } from "../../api/rent";

function Tenants() {
  const { mallId } = useParams();
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await getRentByMallId(mallId);
        console.log("Response:", response);

        if (Array.isArray(response)) {
          // If backend sends directly array []
          setTenants(response);
        } else if (response.success && Array.isArray(response.data)) {
          // If backend sends { success: true, data: [] }
          setTenants(response.data);
        } else {
          setTenants([]);
        }
      } catch (error) {
        console.error("Error fetching tenants:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, [mallId]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-orange-700 mb-8">Tenants</h1>

      {loading ? (
        <div className="text-center text-gray-500 text-lg">
          Loading tenants...
        </div>
      ) : tenants.length == 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No tenants available.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tenants.map((tenant) => (
            <div
              key={tenant.id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden p-5 transition hover:shadow-xl duration-300"
            >
              <img
                src={`${backendURL}${tenant.rentInfo?.bannerUrl}`}
                alt={tenant.rentInfo?.businessName}
                className="w-full h-40 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold text-orange-700">
                {tenant.rentInfo?.businessName}
              </h2>
              <p className="text-gray-600">{tenant.rentInfo?.description}</p>
              <p className="text-gray-600">At Room {tenant.room?.roomNumber}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tenants;

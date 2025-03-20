import React, { useEffect, useState } from "react";
import { getPricePerCareList } from "../../api/room"; // Assuming this API call exists
import { useAuth } from "../../context/AuthContext";

function PricePerCareList() {
  const [priceList, setPriceList] = useState([]);
  const { userData } = useAuth(); // Get mallId from user data

  useEffect(() => {
    async function fetchPricePerCare() {
      try {
        if (!userData?.mallId) return;
        const response = await getPricePerCareList(userData.mallId);
        setPriceList(response || []);
      } catch (error) {
        console.error("Error fetching price per care list:", error.message);
      }
    }
    fetchPricePerCare();
  }, [userData?.mallId]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-1/2 border border-gray-300 mt-4">
      <h2 className="text-lg text-black mb-4">Price Per Care List</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Floor</th>
            <th className="py-2 px-4 border-b text-left">Price (ETB)</th>
          </tr>
        </thead>
        <tbody>
          {priceList.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4">
                No price data available
              </td>
            </tr>
          ) : (
            priceList.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b">
                  {item.floorDescription || "N/A"}
                </td>
                <td className="py-2 px-4 border-b">{item.price} ETB</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PricePerCareList;

import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getFirstPayments } from "../../api/payment";

const FirstPayment = () => {
  const [data, setData] = useState([]);
  const { userData } = useAuth();
  useEffect(() => {
    async function fetchPricePerCare() {
      try {
        if (!userData?.mallId) return;
        const response = await getFirstPayments(userData.mallId);
        setData(response || []);
      } catch (error) {
        console.error("Error ", error.message);
      }
    }
    fetchPricePerCare();
  }, [userData?.mallId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Payments</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="p-4">Tenant Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">First Payment</th>
              <th className="p-4">Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{item.acceptedUser.user.fullName}</td>
                <td className="p-4">{item.acceptedUser.user.phoneNumber}</td>
                <td className="p-4">{item.acceptedUser.firstpayment}</td>
                <td className="p-4">
                  {new Date(item.paymentDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FirstPayment;

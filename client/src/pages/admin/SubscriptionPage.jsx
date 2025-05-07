import React, { useEffect, useState } from "react";
import { getMall } from "../../api/mall";
import { createSubscription, getSubscriptions } from "../../api/subscription";

const SubscriptionPage = () => {
  const [malls, setMalls] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [formData, setFormData] = useState({
    mallId: "",
    price: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchMalls();
    fetchSubscriptions();
  }, []);

  const fetchMalls = async () => {
    try {
      const data = await getMall();
      if (data.success) {
        setMalls(data.malls);
      }
    } catch (error) {
      console.error("Error fetching malls:", error.message);
    }
  };

  const fetchSubscriptions = async () => {
    const res = await getSubscriptions();
    setSubscriptions(res.data || []);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSubscription("/api/subscriptions", formData);
    setFormData({ mallId: "", price: "", startDate: "", endDate: "" });
    fetchSubscriptions();
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date)
      .toLocaleDateString("en-US", options)
      .replace(",", "/");
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Add Subscription
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg"
      >
        <div>
          <label className="block mb-1 font-medium text-gray-600">Mall</label>
          <select
            name="mallId"
            value={formData.mallId}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select a Mall</option>
            {malls.map((mall) => (
              <option key={mall.id} value={mall.id}>
                {mall.mallName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-600">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-600">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-600">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="col-span-1 md:col-span-2 text-right">
          <button
            type="submit"
            className="bg-red-700  text-white px-6 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Add Subscription
          </button>
        </div>
      </form>

      <h2 className="text-3xl font-semibold mt-10 mb-4 text-gray-800">
        All Subscriptions
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border mt-4 bg-white rounded-lg shadow-lg text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 text-left text-gray-700">Mall</th>
              <th className="py-3 px-6 text-left text-gray-700">Price</th>
              <th className="py-3 px-6 text-left text-gray-700">Start Date</th>
              <th className="py-3 px-6 text-left text-gray-700">End Date</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50">
                <td className="py-3 px-6 border">
                  {sub.mall?.mallName || "N/A"}
                </td>
                <td className="py-3 px-6 border">${sub.price.toFixed(2)}</td>
                <td className="py-3 px-6 border">
                  {formatDate(sub.startDate)}
                </td>
                <td className="py-3 px-6 border">{formatDate(sub.endDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionPage;

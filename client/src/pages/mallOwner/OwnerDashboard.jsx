import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, ShoppingBag, DollarSign, TrendingUp } from "lucide-react";

const randomData = (length, min, max) =>
  Array.from({ length }, () => ({
    value: Math.floor(Math.random() * (max - min + 1)) + min,
  }));

const barData = randomData(7, 100, 500).map((d, i) => ({
  name: `Day ${i + 1}`,
  sales: d.value,
}));
const lineData = randomData(7, 2000, 10000).map((d, i) => ({
  name: `Week ${i + 1}`,
  revenue: d.value,
}));
const pieData = [
  { name: "Malls", value: 10 },
  { name: "Tenants", value: 50 },
  { name: "Users", value: 150 },
];
const colors = ["#4CAF50", "#FF9800", "#2196F3"];

export default function OwnerDashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Owner Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[
          {
            title: "Total Users",
            value: 350,
            icon: <Users className="text-blue-500 w-10 h-10" />,
          },
          {
            title: "Total Malls",
            value: 12,
            icon: <ShoppingBag className="text-green-500 w-10 h-10" />,
          },
          {
            title: "Revenue",
            value: "$25,600",
            icon: <DollarSign className="text-yellow-500 w-10 h-10" />,
          },
          {
            title: "Growth Rate",
            value: "8.4%",
            icon: <TrendingUp className="text-red-500 w-10 h-10" />,
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-white shadow-lg rounded-lg flex items-center space-x-4"
          >
            <div>{item.icon}</div>
            <div>
              <p className="text-gray-600">{item.title}</p>
              <p className="text-2xl font-semibold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#4CAF50" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Revenue Growth</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#FF9800"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Mall Statistics</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">User</th>
              <th className="p-2 border">Action</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                user: "John Doe",
                action: "Registered Mall",
                date: "March 5, 2025",
              },
              {
                user: "Jane Smith",
                action: "Updated Profile",
                date: "March 6, 2025",
              },
              {
                user: "Bob Johnson",
                action: "Added Tenant",
                date: "March 7, 2025",
              },
            ].map((item, idx) => (
              <tr key={idx} className="text-center">
                <td className="p-2 border">{item.user}</td>
                <td className="p-2 border">{item.action}</td>
                <td className="p-2 border">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
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
import { getDashboardAdmin } from "../../api/dashboard";

const colors = ["#4CAF50", "#FF9800", "#2196F3"];

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  // Fetch the data from your API endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardAdmin();
        setDashboardData(response);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  // Data from the API response
  const {
    totalMalls,
    totalUsers,
    totalSubscriptionRevenue,
    mallRegistrations,
    subscriptionRevenue,
  } = dashboardData;

  // Sales and revenue data for the charts
  const barData = mallRegistrations.map((d) => ({
    name: `Year ${d.year}`,
    sales: d.count,
  }));

  const lineData = subscriptionRevenue.map((d) => ({
    name: `Year ${d.year}`,
    revenue: d.revenue,
  }));

  const pieData = [
    { name: "Malls", value: totalMalls },
    { name: "Tenants", value: totalUsers }, // Assuming users are tenants for now, modify if needed
    { name: "Users", value: totalUsers },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[
          {
            title: "Total Users",
            value: totalUsers,
            icon: <Users className="text-blue-500 w-10 h-10" />,
          },
          {
            title: "Total Malls",
            value: totalMalls,
            icon: <ShoppingBag className="text-green-500 w-10 h-10" />,
          },
          {
            title: "Revenue",
            value: `$${totalSubscriptionRevenue.toFixed(2)}`,
            icon: <DollarSign className="text-yellow-500 w-10 h-10" />,
          },
          {
            title: "Growth Rate",
            value: "8.4%", // You can calculate this based on your business logic if needed
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
    </div>
  );
}

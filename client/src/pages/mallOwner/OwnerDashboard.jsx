import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart, // <-- Add this import
  Pie, // <-- Add this import
  Cell, // <-- Add this import
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, ShoppingBag, DollarSign, TrendingUp } from "lucide-react";
import { getDashboard } from "../../api/dashboard";
import { useAuth } from "../../context/AuthContext";

export default function OwnerDashboard() {
  const [dashboardData, setDashboardData] = useState({
    postCount: 0,
    tenantCount: 0,
    totalRevenue: 0,
    growthRate: 0,
    yearlyRevenue: [],
    rentGrowthRate: [],
  });

  const pieData = [
    { name: "Occupied", value: dashboardData.occupancyPercent },
    { name: "Available", value: dashboardData.availabilityPercent },
  ];
  const colors = ["#FF5722", "#4CAF50"];
  const { userData } = useAuth(); // Assuming you need this for authentication context

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboard(userData.mallId); // replace with actual mallId
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      }
    };
    fetchData();
  }, [userData.mallId]);

  // Prepare Rent Overview Bar Chart data
  const rentData = dashboardData.yearlyRevenue.map((year) => ({
    year: year.year,
    rent: year.rent,
    total: year.total,
  }));

  // Prepare Rent Growth Line Chart data
  const rentGrowthData = dashboardData.rentGrowthRate.map((growth) => ({
    year: growth.year,
    rentAmount: growth.rentAmount,
    growthRate: parseFloat(growth.growthRate),
  }));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Owner Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[
          {
            title: "Total Tenants",
            value: dashboardData.tenantCount,
            icon: <Users className="text-blue-500 w-10 h-10" />,
          },
          {
            title: "Total Posts",
            value: dashboardData.postCount,
            icon: <ShoppingBag className="text-green-500 w-10 h-10" />,
          },
          {
            title: "Revenue",
            value: `$${dashboardData.totalRevenue.toLocaleString()}`,
            icon: <DollarSign className="text-yellow-500 w-10 h-10" />,
          },
          {
            title: "Growth Rate",
            value: `${dashboardData.growthRate}%`,
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
        {/* Rent Overview Bar Chart */}
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Rent Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={rentData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rent" fill="#4CAF50" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Rent Growth Line Chart */}
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Rent Growth</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={rentGrowthData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="growthRate"
                stroke="#FF9800"
                strokeWidth={2}
                dot={false}
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
              label={({ name, value }) => `${name}: ${value}%`}
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
        <div className="mt-4 text-center">
          <p className="text-gray-700 text-sm">
            Total Rooms:{" "}
            <span className="font-semibold">{dashboardData.totalRooms}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

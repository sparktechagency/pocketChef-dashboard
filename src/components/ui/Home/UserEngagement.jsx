import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const UserEngagement = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => currentYear - 10 + i);

  const [selectedYear, setSelectedYear] = useState(currentYear.toString());

  // Dummy data for User Engagement
  const dummyChartData = [
    { month: "January", totalUsers: 200, activeUsers: 150 },
    { month: "February", totalUsers: 220, activeUsers: 160 },
    { month: "March", totalUsers: 250, activeUsers: 180 },
    { month: "April", totalUsers: 300, activeUsers: 200 },
    { month: "May", totalUsers: 320, activeUsers: 230 },
    { month: "June", totalUsers: 280, activeUsers: 190 },
    { month: "July", totalUsers: 340, activeUsers: 250 },
    { month: "August", totalUsers: 360, activeUsers: 270 },
    { month: "September", totalUsers: 310, activeUsers: 210 },
    { month: "October", totalUsers: 400, activeUsers: 300 },
    { month: "November", totalUsers: 350, activeUsers: 260 },
    { month: "December", totalUsers: 420, activeUsers: 310 },
  ];

  const chartData = dummyChartData;

  return (
    <div className="bg-white p-5 w-[100%] h-[300px] rounded-2xl border">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-bold">User Engagement</h2>
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border rounded-md px-3 py-2 w-32 cursor-pointer"
            style={{
              maxHeight: "150px",
              overflowY: "scroll",
            }}
          >
            {years
              .slice()
              .reverse()
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tickFormatter={(month) => month.slice(0, 3)} />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="bottom" align="center" />
          <Line
            type="monotone"
            dataKey="totalUsers"
            stroke="#f24c05 "
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="activeUsers" stroke="#F6AF58" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserEngagement;

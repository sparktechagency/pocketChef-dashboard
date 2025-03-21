import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", views: 4000 },
  { name: "Feb", views: 3000 },
  { name: "Mar", views: 2000 },
  { name: "Apr", views: 2780 },
  { name: "May", views: 1890 },
  { name: "Jun", views: 2390 },
  { name: "Jul", views: 3490 },
  { name: "Aug", views: 2490 },
  { name: "Sep", views: 1490 },
  { name: "Oct", views: 4490 },
  { name: "Nov", views: 3490 },
  { name: "Dec", views: 1490 },
];

const UserEngagement = () => {
  return (
    <div
      style={{ width: "100%", height: 300 }}
      className="px-5 py-3 bg-white rounded-2xl"
    >
      <h4 className="mb-5 mt-4 text-xl font-semibold">User Engagement</h4>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f28705" stopOpacity={1} />
              <stop offset="100%" stopColor="#f28705" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="views"
            stroke="#f28705"
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserEngagement;

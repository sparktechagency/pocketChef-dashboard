import React, { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

const TotalEarning = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Dummy data to simulate earnings data
  const dummyChartData = [
    { month: "January", revenue: 1200 },
    { month: "February", revenue: 1500 },
    { month: "March", revenue: 1800 },
    { month: "April", revenue: 2100 },
    { month: "May", revenue: 2500 },
    { month: "June", revenue: 2300 },
    { month: "July", revenue: 2700 },
    { month: "August", revenue: 3000 },
    { month: "September", revenue: 2800 },
    { month: "October", revenue: 3100 },
    { month: "November", revenue: 3500 },
    { month: "December", revenue: 4000 },
  ];

  const chartData = dummyChartData;

  // Generate years from 10 years back to 1 year ahead
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 12 },
    (_, i) => currentYear - 10 + i
  ).reverse();

  return (
    <div className="bg-white border p-5 rounded-2xl" style={{ width: "100%" }}>
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold">Total Earning</p>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
          className="border rounded-md px-3 py-1 cursor-pointer"
          style={{
            maxHeight: "150px",
            overflowY: "scroll",
          }}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tickFormatter={(month) => month.slice(0, 3)} />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#5c2579cc"
            fill="#f6e7ff"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalEarning;

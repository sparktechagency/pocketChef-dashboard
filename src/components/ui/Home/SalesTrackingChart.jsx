import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Mo",
    NewUsers: 4000,
    Revenue: 2400,
  },
  {
    name: "Tu",
    NewUsers: 3000,
    Revenue: 1398,
  },
  {
    name: "We",
    NewUsers: 6800,
    Revenue: 3200,
  },
  {
    name: "Th",
    NewUsers: 4780,
    Revenue: 1908,
  },
  {
    name: "Fr",
    NewUsers: 4890,
    Revenue: 2800,
  },
  {
    name: "Su",
    NewUsers: 3390,
    Revenue: 2800,
  },
  {
    name: "St",
    NewUsers: 3490,
    Revenue: 1300,
  },
];

const SalesTrackingChart = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 12 }, (_, i) => currentYear - 10 + i);

  const [selectedYear, setSelectedYear] = useState(currentYear.toString());

  return (
    <div>
      <div className="flex justify-between items-center pe-5">
        <p className="text-base font-semibold px-4 py-">New Users</p>
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
      <ResponsiveContainer width="90%" height={230}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barCategoryGap="30%" // Adjust gap between bars
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Thinner bars */}
          <Bar
            dataKey="NewUsers"
            stackId="a"
            fill="#f28705"
            radius={[20, 20, 0, 0]} // Optional: rounded top corners
            barSize={10} // Make bars thinner
          />
          <Bar
            dataKey="Revenue"
            stackId="a"
            fill="#E4E3E0"
            radius={[20, 20, 0, 0]} // Optional: rounded top corners
            barSize={10} // Make bars thinner
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesTrackingChart;

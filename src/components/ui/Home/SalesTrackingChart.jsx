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
import { useNewUserChartQuery } from "../../../redux/apiSlices/dashboardSlice";
import { Spin } from "antd";

const data = [
  {
    name: "Jan",
    NewUsers: 4000,
  },
  {
    name: "Feb",
    NewUsers: 3000,
  },
  {
    name: "Mar",
    NewUsers: 6800,
  },
  {
    name: "Apr",
    NewUsers: 4780,
  },
  {
    name: "May",
    NewUsers: 4890,
  },
  {
    name: "Jun",
    NewUsers: 3390,
  },
  {
    name: "Jul",
    NewUsers: 3490,
  },
  {
    name: "Aug",
    NewUsers: 3890,
  },
  {
    name: "Sep",
    NewUsers: 4290,
  },
  {
    name: "Oct",
    NewUsers: 4790,
  },
  {
    name: "Nov",
    NewUsers: 4990,
  },
  {
    name: "Dec",
    NewUsers: 5290,
  },
];

const SalesTrackingChart = () => {
  const { data: newUserChart, isLoading } = useNewUserChartQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin />
      </div>
    );
  }

  const chartData = newUserChart?.data;
  console.log(chartData);

  return (
    <div>
      <div className="flex justify-between items-center pe-5">
        <p className="text-base font-semibold px-4 py-">New Users</p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barCategoryGap="30%" // Adjust gap between bars
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Thinner bars */}
          <Bar
            dataKey="count"
            stackId="a"
            fill="#f28705"
            radius={[20, 20, 0, 0]} // Optional: rounded top corners
            barSize={25} // Make bars thinner
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesTrackingChart;

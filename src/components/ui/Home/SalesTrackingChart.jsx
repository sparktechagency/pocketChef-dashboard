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
    Sales: 4000,
    Revenue: 2400,
  },
  {
    name: "Tu",
    Sales: 3000,
    Revenue: 1398,
  },
  {
    name: "We",
    Sales: 6800,
    Revenue: 3200,
  },
  {
    name: "Th",
    Sales: 4780,
    Revenue: 1908,
  },
  {
    name: "Fr",
    Sales: 4890,
    Revenue: 2800,
  },
  {
    name: "Su",
    Sales: 3390,
    Revenue: 2800,
  },
  {
    name: "St",
    Sales: 3490,
    Revenue: 1300,
  },
];

const SalesTrackingChart = () => {
  return (
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
          dataKey="Sales"
          stackId="a"
          fill="#8b0000"
          radius={[20, 20, 0, 0]} // Optional: rounded top corners
          barSize={10} // Make bars thinner
        />
        <Bar
          dataKey="Revenue"
          stackId="a"
          fill="#ffe7e7"
          radius={[20, 20, 0, 0]} // Optional: rounded top corners
          barSize={10} // Make bars thinner
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesTrackingChart;

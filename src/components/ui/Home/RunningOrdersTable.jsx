import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

const RunningOrdersTable = () => {
  // Dummy data for recipes
  const dummyOrders = [
    {
      recipeName: "Spaghetti Carbonara",
      ratings: 4.5,
      reviews: 120,
      shares: 300,
    },
    {
      recipeName: "Chicken Tikka Masala",
      ratings: 4.7,
      reviews: 150,
      shares: 400,
    },
    {
      recipeName: "Beef Tacos",
      ratings: 4.6,
      reviews: 90,
      shares: 250,
    },
    {
      recipeName: "Vegetable Stir Fry",
      ratings: 4.3,
      reviews: 80,
      shares: 200,
    },
    {
      recipeName: "Caesar Salad",
      ratings: 4.4,
      reviews: 110,
      shares: 350,
    },
  ];

  const data = dummyOrders.slice(0, 3).map((order, index) => ({
    ...order,
    key: index.toString(),
  }));

  const columns = [
    {
      title: "Recipe Name",
      dataIndex: "recipeName",
      key: "recipeName",
    },
    {
      title: "Ratings",
      dataIndex: "ratings",
      key: "ratings",
      render: (text) => `${text} ⭐`,
    },
    {
      title: "Reviews",
      dataIndex: "reviews",
      key: "reviews",
    },
    {
      title: "Shares",
      dataIndex: "shares",
      key: "shares",
    },
  ];

  return (
    <div className="border bg-white h-[300px] p-5 rounded-2xl">
      <div className="flex items-center justify-between">
        <h1 className="font-bold mb-2">Trending Recipes</h1>
        <Link to={"/analytics"}>
          <Button className="bg-secondary border-secondary">View All</Button>
        </Link>
      </div>
      <Table columns={columns} pagination={false} dataSource={data} />
    </div>
  );
};

export default RunningOrdersTable;

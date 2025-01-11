import React, { useState } from "react";
import { Table, Button, Input, Space } from "antd";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const RecipeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy data for recipes
  const recipes = [
    {
      id: "1",
      name: "Spaghetti Carbonara",
      image:
        "https://www.chilipeppermadness.com/wp-content/uploads/2022/11/Barbacoa-Tacos-SQ.jpg",
      status: "Available",
    },
    {
      id: "2",
      name: "Chicken Alfredo",
      image:
        "https://www.chilipeppermadness.com/wp-content/uploads/2022/11/Barbacoa-Tacos-SQ.jpg",
      status: "Available",
    },
    {
      id: "3",
      name: "Beef Stroganoff",
      image:
        "https://www.chilipeppermadness.com/wp-content/uploads/2022/11/Barbacoa-Tacos-SQ.jpg",
      status: "Unavailable",
    },
    {
      id: "4",
      name: "Margherita Pizza",
      image:
        "https://www.chilipeppermadness.com/wp-content/uploads/2022/11/Barbacoa-Tacos-SQ.jpg",
      status: "Available",
    },
    {
      id: "5",
      name: "Grilled Cheese Sandwich",
      image:
        "https://www.chilipeppermadness.com/wp-content/uploads/2022/11/Barbacoa-Tacos-SQ.jpg",
      status: "Available",
    },
    {
      id: "6",
      name: "Caesar Salad",
      image:
        "https://www.chilipeppermadness.com/wp-content/uploads/2022/11/Barbacoa-Tacos-SQ.jpg",
      status: "Unavailable",
    },
    {
      id: "7",
      name: "Vegetable Stir Fry",
      image:
        "https://www.chilipeppermadness.com/wp-content/uploads/2022/11/Barbacoa-Tacos-SQ.jpg",
      status: "Available",
    },
    {
      id: "8",
      name: "Teriyaki Chicken",
      image:
        "https://www.chilipeppermadness.com/wp-content/uploads/2022/11/Barbacoa-Tacos-SQ.jpg",
      status: "Available",
    },
    {
      id: "9",
      name: "Eggplant Parmesan",
      image:
        "https://www.chilipeppermadness.com/wp-content/uploads/2022/11/Barbacoa-Tacos-SQ.jpg",
      status: "Unavailable",
    },
    {
      id: "10",
      name: "Greek Salad",
      image:
        "https://www.chilipeppermadness.com/wp-content/uploads/2022/11/Barbacoa-Tacos-SQ.jpg",
      status: "Available",
    },
    {
      id: "11",
      name: "Shrimp Scampi",
      image:
        "https://www.chilipeppermadness.com/wp-content/uploads/2022/11/Barbacoa-Tacos-SQ.jpg",
      status: "Available",
    },
    {
      id: "12",
      name: "Fish Tacos",
      image:
        "https://www.chilipeppermadness.com/wp-content/uploads/2022/11/Barbacoa-Tacos-SQ.jpg",
      status: "Available",
    },
    {
      id: "13",
      name: "Pancakes",
      image:
        "https://www.chilipeppermadness.com/wp-content/uploads/2022/11/Barbacoa-Tacos-SQ.jpg",
      status: "Available",
    },
    {
      id: "14",
      name: "Chili Con Carne",
      image:
        "https://www.chilipeppermadness.com/wp-content/uploads/2022/11/Barbacoa-Tacos-SQ.jpg",
      status: "Unavailable",
    },
    {
      id: "15",
      name: "Classic Cheesecake",
      image:
        "https://www.chilipeppermadness.com/wp-content/uploads/2022/11/Barbacoa-Tacos-SQ.jpg",
      status: "Available",
    },
  ];

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Recipe Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <img
            src={record.image}
            alt={record.name}
            className="w-16 h-16 rounded-full"
          />
          <span>{record.name}</span>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space>
          <Button className="bg-primary text-white px-7 rounded-xl py-4">
            Edit
          </Button>
          <Button className="bg-button text-white px-7 rounded-xl py-4">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-5">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-semibold mb-4">Recipe Management</h1>
        <div className="flex items-center gap-5">
          <Input
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 300, height: 42, borderRadius: 15 }}
          />
          <Link to="/add-recipe">
            <Button className="bg-primary text-white py-5 rounded-2xl">
              <FaPlus /> Add Recipe
            </Button>
          </Link>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredRecipes}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default RecipeManagement;

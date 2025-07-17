import React, { useState } from "react";
import { Table, Button, Input, Space, Spin, Image, Modal } from "antd";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
  useDeleteRecipeMutation,
  useGetAllRecipesQuery,
} from "../../../redux/apiSlices/recipeSlice";
import { imageUrl } from "../../../redux/api/baseApi";
import toast from "react-hot-toast";

const RecipeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: allRecipes, isLoading } = useGetAllRecipesQuery();
  const [deleteRecipe] = useDeleteRecipeMutation();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin />
      </div>
    );

  const recipeData = allRecipes?.data?.data;

  console.log(recipeData);

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this recipe?",
      content: "This action cannot be undone.",
      onOk: async () => {
        try {
          const res = await deleteRecipe(id).unwrap();
          if (res.success) {
            toast.success("Recipe deleted successfully!");
          }
        } catch (error) {
          toast.error(error.data?.message || "Failed to delete recipe");
        }
      },
      onCancel: () => { },
    });
  };

  const filteredRecipes = recipeData?.filter((recipe) =>
    recipe?.recipeName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Recipe Name",
      dataIndex: "recipeName",
      key: "recipeName",
      render: (text, record) => (
        <Space>
          <Image
            src={
              record?.image?.[0] ? record?.image?.[0].startsWith("http") ? record?.image?.[0] : `${imageUrl}${record?.image?.[0]}` : ""
            }
            alt={record.recipeName}
            className="!w-16 !h-16 rounded-lg object-cover"
          />
          <span>{record.recipeName}</span>
        </Space>
      ),
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
    },
    {
      title: "Level",
      dataIndex: "selectLevel",
      key: "selectLevel",
    },
    {
      title: "Rating",
      dataIndex: "totalRatings",
      key: "totalRatings",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space>
          {/* <Link to={`/edit-recipe/${record._id}`}>
            <Button className="bg-primary text-white px-7 rounded-xl py-4">
              Edit
            </Button>
          </Link> */}
          <Link to={`/recipe/${record._id}`}>
            <Button className="bg-primary text-white px-7 rounded-xl py-4">
              View
            </Button>
          </Link>
          <Button
            onClick={() => handleDelete(record._id)}
            className="bg-button text-white px-7 rounded-xl py-4"
          >
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
        rowKey="_id"
      />
    </div>
  );
};

export default RecipeManagement;

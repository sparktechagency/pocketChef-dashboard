import React, { useState } from "react";
import { Table, Button, Input, Space, Switch, Modal, Form } from "antd";
import { FaEdit } from "react-icons/fa";
import { FaPlus, FaTrash } from "react-icons/fa6";

const ManageCategory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  // Dummy data for categories
  const categories = [
    {
      id: "1",
      name: "Italian",
      subCategories: 5,
      isHome: true,
    },
    {
      id: "2",
      name: "Chinese",
      subCategories: 3,
      isHome: false,
    },
    {
      id: "3",
      name: "Mexican",
      subCategories: 4,
      isHome: true,
    },
    {
      id: "4",
      name: "Indian",
      subCategories: 6,
      isHome: true,
    },
    {
      id: "5",
      name: "Thai",
      subCategories: 2,
      isHome: false,
    },
    {
      id: "6",
      name: "Japanese",
      subCategories: 7,
      isHome: true,
    },
    {
      id: "7",
      name: "Greek",
      subCategories: 3,
      isHome: false,
    },
    {
      id: "8",
      name: "Spanish",
      subCategories: 5,
      isHome: true,
    },
    {
      id: "9",
      name: "French",
      subCategories: 4,
      isHome: false,
    },
    {
      id: "10",
      name: "Korean",
      subCategories: 2,
      isHome: true,
    },
  ];

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Sub Categories",
      dataIndex: "subCategories",
      key: "subCategories",
    },
    {
      title: "Add to Home",
      dataIndex: "isHome",
      key: "isHome",
      render: (text, record) => <Switch checked={record.isHome} />,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space>
          <div className="cursor-pointer" onClick={() => handleEdit(record)}>
            <FaEdit size={20} />
          </div>
          <div className="cursor-pointer">
            <FaTrash size={20} className="text-red-600" />
          </div>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    setCurrentCategory(record);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setCurrentCategory(null);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    // Handle add/update logic here
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="bg-white rounded-2xl p-10">
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-semibold mb-4">Manage Categories</h1>
        <div className="flex items-center gap-5">
          <Input
            placeholder="Search by category name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 300, height: 42, borderRadius: 15 }}
          />
          <Button
            className="bg-primary text-white py-5 rounded-2xl"
            onClick={handleAdd}
          >
            <FaPlus size={20} /> Add Category
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredCategories}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={currentCategory ? "Edit Category" : "Add Category"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        className="custom-modal"
      >
        <Form layout="vertical">
          <Form.Item label="Category Name">
            <Input
              style={{ height: 45 }}
              placeholder="Enter category name"
              defaultValue={currentCategory ? currentCategory.name : ""}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageCategory;

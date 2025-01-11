import React, { useState } from "react";
import { Table, Button, Input, Space, Switch, Modal, Form, Select } from "antd";
import { FaEdit } from "react-icons/fa";
import { FaPlus, FaTrash } from "react-icons/fa";

const ManageSubCategory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSubCategory, setCurrentSubCategory] = useState(null);

  // Dummy data for categories
  const categories = [
    { id: "1", name: "Italian" },
    { id: "2", name: "Chinese" },
    { id: "3", name: "Mexican" },
  ];

  // Dummy data for subcategories
  const subCategories = [
    {
      id: "1",
      name: "Pasta",
      category: "Italian",
      isHome: true,
    },
    {
      id: "2",
      name: "Noodles",
      category: "Chinese",
      isHome: false,
    },
    {
      id: "3",
      name: "Tacos",
      category: "Mexican",
      isHome: true,
    },
  ];

  const filteredSubCategories = subCategories.filter((subCategory) =>
    subCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "S.No",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Sub Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
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
    setCurrentSubCategory(record);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setCurrentSubCategory(null);
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
    <div className="p-5">
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-semibold mb-4">Manage Sub Categories</h1>
        <div className="flex items-center gap-5">
          <Input
            placeholder="Search by sub category name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 300, height: 42, borderRadius: 15 }}
          />
          <Button
            className="bg-primary text-white py-5 rounded-2xl"
            onClick={handleAdd}
          >
            <FaPlus size={20} /> Add Sub Category
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredSubCategories}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={currentSubCategory ? "Edit Sub Category" : "Add Sub Category"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        className="custom-modal"
      >
        <Form layout="vertical">
          <Form.Item label="Sub Category Name">
            <Input
              style={{ height: 42, borderRadius: 10 }}
              placeholder="Enter sub category name"
              defaultValue={currentSubCategory ? currentSubCategory.name : ""}
            />
          </Form.Item>
          <Form.Item label="Category Name">
            <Select
              style={{ height: 42, borderRadius: 15 }}
              placeholder="Select a category"
              defaultValue={
                currentSubCategory ? currentSubCategory.category : ""
              }
            >
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.name}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageSubCategory;

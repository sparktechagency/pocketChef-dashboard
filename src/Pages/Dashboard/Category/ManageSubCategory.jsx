import React, { useState } from "react";
import { Table, Button, Input, Space, Modal, Form, Select, Spin } from "antd";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import {
  useAddSubCategoryMutation,
  useCategoriesQuery,
  useDeleteSubCategoryMutation,
  useSubCategoriesQuery,
  useUpdateSubCategoryMutation,
} from "../../../redux/apiSlices/categorySlice";
import toast from "react-hot-toast";

const ManageSubCategory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSubCategory, setCurrentSubCategory] = useState(null);
  const [form] = Form.useForm();

  const { data: allCategories, isLoading } = useCategoriesQuery();
  const { data: getAllSubCategories, isLoading: subCategoryLoading } =
    useSubCategoriesQuery();
  const [addSubCategory] = useAddSubCategoryMutation();
  const [updateSubCategory] = useUpdateSubCategoryMutation();
  const [deleteSubCategory] = useDeleteSubCategoryMutation();

  if (isLoading || subCategoryLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );
  }

  const subCategories = getAllSubCategories?.data;
  const categories = allCategories?.data;

  const filteredSubCategories = subCategories?.filter((subCategory) =>
    subCategory?.subCategory?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const columns = [
    {
      title: "S.No",
      dataIndex: "serial",
      key: "serial",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Sub Category Name",
      dataIndex: "subCategory",
      key: "subCategory",
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space>
          <div className="cursor-pointer" onClick={() => handleEdit(record)}>
            <FaEdit size={20} />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => handleDelete(record?._id)}
          >
            <FaTrash size={20} className="text-red-600" />
          </div>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    setCurrentSubCategory(record);
    setIsModalVisible(true);
    form.setFieldsValue({
      subCategory: record.subCategory,
      _id: record.category?._id,
    });
  };

  const handleAdd = () => {
    setCurrentSubCategory(null);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubCategory(id).unwrap();
      toast.success("Sub Category deleted successfully");
    } catch (error) {
      toast.error(error?.message || "Failed to delete sub category");
    }
  };

  const handleModalOk = async (values) => {
    const data = {
      category: values?._id,
      subCategory: values?.subCategory,
    };

    try {
      if (currentSubCategory) {
        await updateSubCategory({
          id: currentSubCategory._id,
          data: data,
        }).unwrap();
        toast.success("Sub Category updated successfully");
      } else {
        await addSubCategory(data).unwrap();
        toast.success("Sub Category added successfully");
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      toast.error(error?.message || "Failed to save sub category");
    }
  };

  return (
    <div className="p-10 rounded-2xl bg-white">
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
        rowKey="_id"
      />

      <Modal
        title={currentSubCategory ? "Edit Sub Category" : "Add Sub Category"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Save
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleModalOk}>
          <Form.Item
            name="subCategory"
            label="Sub Category Name"
            rules={[
              { required: true, message: "Please enter a subcategory name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="_id"
            label="Category Name"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select>
              {categories?.map((category) => (
                <Select.Option key={category?._id} value={category?._id}>
                  {category?.name}
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

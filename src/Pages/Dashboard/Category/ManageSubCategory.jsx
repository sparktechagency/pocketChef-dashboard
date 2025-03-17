import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Switch,
  Modal,
  Form,
  Select,
  Spin,
} from "antd";
import { FaEdit } from "react-icons/fa";
import { FaPlus, FaTrash } from "react-icons/fa";
import {
  useAddSubCategoryMutation,
  useCategoriesQuery,
  useSubCategoriesQuery,
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

  if (isLoading || subCategoryLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );
  }

  const subCategories = getAllSubCategories?.data;
  const categories = allCategories?.data;
  // console.log(categories, subCategories);

  // Dummy data for subcategories
  // const subCategories = [
  //   {
  //     id: "1",
  //     name: "Pasta",
  //     category: "Italian",
  //     isHome: true,
  //   },
  //   {
  //     id: "2",
  //     name: "Noodles",
  //     category: "Chinese",
  //     isHome: false,
  //   },
  //   {
  //     id: "3",
  //     name: "Tacos",
  //     category: "Mexican",
  //     isHome: true,
  //   },
  // ];

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

  const handleModalOk = async (values) => {
    const data = {
      category: values?._id,
      subCategory: values?.subCategory,
    };

    try {
      const res = await addSubCategory(data).unwrap();

      if (res?.success) {
        toast.success("Sub Category added successfully");
        setIsModalVisible(false);
        form.resetFields();
      } else {
        toast.error("Failed to add sub category");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to add sub category");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
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
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()} // Ensure form submits
          >
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

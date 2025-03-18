import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Modal,
  Form,
  Spin,
  ConfigProvider,
} from "antd";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import logo from "../../../assets/whiteBG.png";
import {
  useAddCategoryMutation,
  useCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../redux/apiSlices/categorySlice";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import toast from "react-hot-toast";
import { imageUrl } from "../../../redux/api/baseApi";

const ManageCategory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [imgURL, setImgURL] = useState("");
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();

  const { data: getAllCategories, isLoading } = useCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );
  }

  const categories = getAllCategories?.data;

  const filteredCategories = categories?.filter((category) =>
    category?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleDelete = async (record) => {
    try {
      const res = await deleteCategory(record._id).unwrap();
      if (res?.success) {
        toast.success("Category deleted successfully");
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "serial",
      key: "serial",
      render: (text, record, index) => index + 1,
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
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space>
          <div className="cursor-pointer" onClick={() => handleEdit(record)}>
            <FaEdit size={20} />
          </div>
          <div className="cursor-pointer">
            <FaTrash
              onClick={() => handleDelete(record)}
              size={20}
              className="text-red-600"
            />
          </div>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    console.log("ssgvsgvsgvrsgvd", record);
    setCurrentCategory(record);
    setImgURL(
      record?.category
        ? record?.category?.startsWith("http")
          ? record?.category
          : `${imageUrl}${record?.category}`
        : logo
    ); // Use default logo if no imageUrl is present
    form.setFieldsValue({ name: record.name }); // Set form values for editing
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setCurrentCategory(null);
    setImgURL(logo);
    form.resetFields(); // Reset form fields for adding
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("name", values.name);
      if (file) {
        formData.append("category", file); // Append the file to FormData
      }

      if (currentCategory?._id) {
        // Update existing category
        const res = await updateCategory({
          id: currentCategory._id,
          body: formData, // Pass FormData as the body
        }).unwrap();
        if (res?.success) {
          toast.success(res?.message || "Category updated successfully");
        } else {
          toast.error(res?.message || "Failed to update category");
        }
      } else {
        // Add new category
        const res = await addCategory(formData).unwrap();
        if (res?.success) {
          toast.success(res?.message || "Category added successfully");
        } else {
          toast.error(res?.message || "Failed to add category");
        }
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error adding or updating category:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setImgURL(logo); // Reset image URL to default logo
  };

  const onChangeImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imgUrl = URL.createObjectURL(selectedFile);
      setImgURL(imgUrl);
      setFile(selectedFile);
    }
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
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#f28705",
              headerColor: "#fff",
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={filteredCategories}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
      </ConfigProvider>

      <Modal
        title={currentCategory ? "Edit Category" : "Add Category"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        className="custom-modal"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Category Name"
            name="name"
            rules={[
              { required: true, message: "Please enter a category name" },
            ]}
          >
            <Input style={{ height: 45 }} placeholder="Enter category name" />
          </Form.Item>
          <div>
            <div className="flex flex-col items-center mb-4">
              <input
                onChange={onChangeImage}
                type="file"
                id="img"
                style={{ display: "none" }}
              />
              <label
                htmlFor="img"
                className="relative w-full h-80 cursor-pointer border border-gray-300 bg-white bg-cover bg-center shadow-sm hover:shadow-lg transition-shadow duration-300"
                style={{
                  backgroundImage: `url(${imgURL})`,
                }}
              >
                {!imgURL && (
                  <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <MdOutlineAddPhotoAlternate
                      size={60}
                      className="text-gray-600"
                    />
                  </div>
                )}
              </label>
              <p className="mt-2 text-sm text-gray-500">
                Click to upload image
              </p>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageCategory;

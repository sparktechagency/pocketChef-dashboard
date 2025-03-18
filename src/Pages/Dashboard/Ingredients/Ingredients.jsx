import React, { useState } from "react";
import { Space, Table, Modal, Form, Input, Button, Spin, message } from "antd";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import logo from "../../../assets/whiteBG.png";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import {
  useAddIngredientMutation,
  useDeleteIngredientMutation,
  useIngredientsQuery,
  useUpdateIngredientMutation,
} from "../../../redux/apiSlices/ingredientsSlice";
import { imageUrl } from "../../../redux/api/baseApi";
import toast from "react-hot-toast";

const { TextArea } = Input;

const Ingredients = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [imgURL, setImgURL] = useState(logo);
  const [file, setFile] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const { data: ingredientsData, isLoading, refetch } = useIngredientsQuery();
  const [addIngredient] = useAddIngredientMutation();
  const [updateIngredient] = useUpdateIngredientMutation();
  const [deleteIngredient] = useDeleteIngredientMutation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );
  }
  const ingredients = ingredientsData?.data;

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "ingredientImages",
      key: "ingredientImages",
      render: (image, record) => (
        <img
          src={
            record?.ingredientImages?.startsWith("http")
              ? record?.ingredientImages
              : `${imageUrl}${record?.ingredientImages}`
          }
          alt="ingredient"
          style={{ width: 50, height: 50, borderRadius: 5 }}
          className="object-cover"
        />
      ),
    },
    {
      title: "Sub Name",
      dataIndex: "subName",
      key: "subName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <p className="text-sm line-clamp-2 w-[800px]">{text}</p>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <FaEdit
            size={20}
            className="cursor-pointer"
            onClick={() => handleEdit(record)}
          />
          <FaTrash
            size={20}
            color="red"
            className="cursor-pointer"
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setIsEditMode(false); // Set to add mode
    setIsModalVisible(true);
    form.resetFields();
    setImgURL(logo); // Reset the image preview
    setFile(null); // Reset the file state
  };

  const handleEdit = (record) => {
    setIsEditMode(true); // Set to edit mode
    setSelectedIngredient(record);
    form.setFieldsValue({
      name: record.name,
      subName: record.subName,
      description: record.description,
      preparation: record.preparation,
    });
    setImgURL(
      record.ingredientImages.startsWith("http")
        ? record.ingredientImages
        : `${imageUrl}${record.ingredientImages}`
    );
    setIsModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("sdsdvsdfsdfsdf", values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("subName", values.subName);
      formData.append("description", values.description);
      formData.append("preparation", values.preparation);
      if (file) {
        formData.append("ingredientImages", file); // Append the image file
      }

      if (isEditMode) {
        // Update existing ingredient
        const res = await updateIngredient({
          id: selectedIngredient._id,
          data: formData,
        }).unwrap();
        if (res.success) {
          toast.success(res.message || "Ingredient updated successfully");
          setIsModalVisible(false);
          form.resetFields();
          setImgURL(logo); // Reset the image preview
          setFile(null); // Reset the file state
          refetch(); // Refresh the data
        } else {
          toast.error(res.message || "Failed to update ingredient");
        }
      } else {
        // Add new ingredient
        const res = await addIngredient(formData).unwrap();
        if (res.success) {
          toast.success(res.message || "Ingredient added successfully");
          setIsModalVisible(false);
          form.resetFields();
          setImgURL(logo); // Reset the image preview
          setFile(null); // Reset the file state
          refetch(); // Refresh the data
        } else {
          toast.error(res.message || "Failed to add ingredient");
        }
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setImgURL(logo); // Reset the image preview
    setFile(null); // Reset the file state
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this ingredient?",
      content: "This action cannot be undone.",
      onOk: () => {
        deleteIngredient(id)
          .unwrap()
          .then(() => {
            toast.success("Ingredient deleted successfully");
            refetch(); // Refresh the data
          })
          .catch((error) => {
            toast.error("Failed to delete ingredient");
            console.error("Failed to delete ingredient:", error);
          });
      },
      onCancel: () => {},
    });
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
    <div className="bg-white p-5 rounded-lg">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Ingredients</h1>
        <div>
          <button
            className="bg-primary flex items-center gap-2 text-white px-4 py-2 rounded"
            onClick={showModal}
          >
            <FaPlus size={20} /> Add Ingredient
          </button>
        </div>
      </div>
      <div>
        <Table rowKey="_id" columns={columns} dataSource={ingredients} />
      </div>

      {/* Combined Add/Edit Modal */}
      <Modal
        title={isEditMode ? "Edit Ingredient" : "Add Ingredient"}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        className="custom-modal"
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input style={{ height: 42 }} placeholder="Enter ingredient name" />
          </Form.Item>
          <Form.Item
            label="Sub Name"
            name="subName"
            rules={[{ required: true, message: "Please enter the sub name" }]}
          >
            <Input style={{ height: 42 }} placeholder="Enter sub name" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <TextArea rows={4} placeholder="Enter description" />
          </Form.Item>
          <Form.Item
            label="Preparation"
            name="preparation"
            rules={[
              { required: true, message: "Please enter the preparation" },
            ]}
          >
            <TextArea rows={4} placeholder="Enter preparation" />
          </Form.Item>
          <div>
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: "Please upload an image" }]}
            >
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
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Ingredients;

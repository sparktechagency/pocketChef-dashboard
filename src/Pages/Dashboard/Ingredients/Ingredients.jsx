import React, { useState } from "react";
import { Space, Table, Modal, Form, Input, Upload, Button } from "antd";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import logo from "../../../assets/whiteBG.png";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const { TextArea } = Input;

const Ingredients = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [imgURL, setImgURL] = useState(logo);
  const [file, setFile] = useState(null);

  const ingredients = [
    {
      key: "1",
      name: "Tomato",
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQAOpGpc-kiO1H-awMfLOrgBoi20cQv43EnRL6QvT1eKgWgczRjzXfg7J0kUIq-Z2K8qBZx0-Haz9PnMRXJswB5AQ",
      subName: "Solanum lycopersicum",
      description: "A red, edible fruit used in various cuisines.",
    },
    {
      key: "2",
      name: "Basil",
      image:
        "https://www.veggycation.com.au/siteassets/veggycationvegetable/basil.jpg",
      subName: "Ocimum basilicum",
      description: "A culinary herb used for its aromatic leaves.",
    },
    {
      key: "3",
      name: "Garlic",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQPozp1am84RbkSvYV1_7Lpx8EFAzdOj7yrslk3c2Dacs9ambvnnI89SzAn42Y32aHKAHM57tC36iTb7JA2OLQNg",
      subName: "Allium sativum",
      description: "A species in the onion genus, used for its pungent flavor.",
    },
    {
      key: "4",
      name: "Olive Oil",
      image:
        "https://health.ucdavis.edu/media-resources/contenthub/post/internet/good-food/2024/04/images-body/olive-oil-health-benefits.jpg",
      subName: "Olea europaea",
      description: "A liquid fat obtained from olives, used in cooking.",
    },
    {
      key: "5",
      name: "Salt",
      image:
        "https://www.canr.msu.edu/outreach/uploads/images/salt-6728600_1280.jpg?language_id=1",
      subName: "Sodium chloride",
      description: "A mineral used as a seasoning and preservative.",
    },
  ];

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
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="ingredient"
          style={{ width: 50, height: 50, borderRadius: 5 }}
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
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: () => (
        <Space>
          <FaEdit size={20} />
          <FaTrash size={20} />
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form Values:", values);
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((error) => {
        console.error("Validation Failed:", error);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
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
        <Table columns={columns} dataSource={ingredients} />
      </div>

      {/* Add Ingredient Modal */}
      <Modal
        title="Add Ingredient"
        open={isModalVisible}
        onOk={handleOk}
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

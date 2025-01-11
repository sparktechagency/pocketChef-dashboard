import React, { useState } from "react";
import { Form, Input, Button, Upload, Image } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const Template = () => {
  const [formData, setFormData] = useState({
    headerTitle: "",
    recipeName: "",
    details: "",
    images: [],
  });

  const [fileList, setFileList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUploadChange = ({ file, fileList: newFileList }) => {
    setFileList(newFileList);
    setFormData({ ...formData, images: newFileList });
  };

  const handleSubmit = () => {
    const templateData = {
      ...formData,
      images: fileList.map((file) => file.originFileObj),
    };
    console.log("Submitted Template Data:", templateData);
    // Add your form submission logic here
  };

  return (
    <div className="p-10 bg-white rounded-2xl">
      <h1 className="text-2xl font-semibold mb-10">Template Form</h1>
      <Form layout="vertical" className="w-1/2" onFinish={handleSubmit}>
        <Form.Item label="Header Title" name="headerTitle">
          <Input
            className="py-3"
            placeholder="header title"
            name="headerTitle"
            value={formData.headerTitle}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Recipe Name" name="recipeName">
          <Input
            className="py-3"
            placeholder="recipe name"
            name="recipeName"
            value={formData.recipeName}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Details" name="details">
          <TextArea
            name="details"
            placeholder="details"
            rows={6}
            value={formData.details}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          label="Image Upload"
          name="images"
          rules={[{ required: true, message: "Please upload images!" }]}
        >
          <Upload.Dragger
            multiple
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false} // Prevent auto-upload
            style={{
              minHeight: "150px",
              padding: "20px",
              border: "2px dashed #d9d9d9",
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined size={40} />
            </p>
            <div className="ant-upload-text">
              {fileList.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {fileList.map((file, index) => (
                    <Image
                      key={index}
                      src={URL.createObjectURL(file.originFileObj)}
                      alt={`Image ${index + 1}`}
                      width={80}
                      className="rounded-md !w-20 !h-20 object-cover"
                    />
                  ))}
                </div>
              ) : (
                "Click or drag images here to upload"
              )}
            </div>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item>
          <Button
            className="bg-primary text-white w-[160px] h-[42px] rounded-lg"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Template;

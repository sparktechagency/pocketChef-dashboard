import React, { useState } from "react";
import { Form, Input, Button, Upload, Image, Table, Spin } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import {
  useAddBannerMutation,
  useAllBannerQuery,
} from "../../redux/apiSlices/banenrSlice";
import { imageUrl } from "../../redux/api/baseApi";
import toast from "react-hot-toast";

const { TextArea } = Input;

const Template = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: bannerData, isLoading } = useAllBannerQuery();
  const [addBanner] = useAddBannerMutation();

  const handleSubmit = async (values) => {
    setLoading(true);
    const formData = new FormData();

    // Append text fields
    formData.append("name", values.name);
    formData.append("category", values.category);
    formData.append("description", values.description);

    // Append single image
    if (fileList.length > 0) {
      formData.append("bannerImages", fileList[0].originFileObj);
    }

    try {
      const res = await addBanner(formData).unwrap();
      if (res?.success) {
        form.resetFields();
        setFileList([]);
        toast.success(res?.message || "Banner added successfully");
      }
    } catch (err) {
      toast.error("Error adding banner");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    // Allow only one file
    setFileList(newFileList.slice(-1));
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "bannerImages",
      render: (_, record) => (
        <Image
          src={`${imageUrl}/${record.bannerImages}`}
          width={80}
          className="rounded-md !w-20 !h-20 object-cover"
        />
      ),
    },
    {
      title: "Recipe Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Details",
      dataIndex: "description",
      key: "description",
      render: (text) => <div className="line-clamp-3">{text}</div>,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );
  }

  return (
    <div className="p-10 bg-white rounded-2xl">
      <h1 className="text-2xl font-semibold mb-10">Home Banner</h1>
      <div className="flex gap-10">
        <div className="w-1/2">
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Recipe Name"
              name="name"
              rules={[{ required: true, message: "Please enter recipe name!" }]}
            >
              <Input placeholder="Recipe Name" />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please enter category!" }]}
            >
              <Input placeholder="Category" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter description!" }]}
            >
              <TextArea rows={6} placeholder="Description" />
            </Form.Item>

            <Form.Item
              label="Banner Image"
              required
              extra="Only one image allowed (JPEG/PNG)"
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleUploadChange}
                beforeUpload={() => false}
                accept="image/png, image/jpeg"
                maxCount={1}
              >
                {fileList.length >= 1 ? null : (
                  <div>
                    <InboxOutlined style={{ fontSize: "24px" }} />
                    <div style={{ marginTop: 8 }}>Click to Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="bg-primary text-white w-[160px] h-[42px] rounded-lg"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="w-1/2 border p-5 rounded-lg">
          <h1 className="text-2xl font-semibold mb-10">Existing Banners</h1>
          <Table
            columns={columns}
            dataSource={bannerData?.data || []}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Template;

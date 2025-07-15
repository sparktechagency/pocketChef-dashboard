import React, { useState } from "react";
import { Table, Button, Space, Avatar, Input, Modal, Form } from "antd";
import { Link } from "react-router-dom";
import randomImg from "../../assets/randomProfile2.jpg";
import { FaIcons } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { BiSolidMessageDetail } from "react-icons/bi";
import {
  useBanUserMutation,
  useUsersQuery,
} from "../../redux/apiSlices/userSlice";
import { imageUrl } from "../../redux/api/baseApi";
import toast from "react-hot-toast";

const Users = () => {
  const { data: getUsers, isLoading } = useUsersQuery();
  const [banUser] = useBanUserMutation();
  const userData = getUsers?.data;

  console.log(userData);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
  const [messageContent, setMessageContent] = useState("");

  // Dummy data for users


  const filteredUsers = userData?.filter(
    (user) =>
      user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (values) => {
    console.log("User Created: ", values);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showMessageModal = () => {
    setIsMessageModalVisible(true);
  };

  const handleMessageOk = () => {
    console.log("Message Sent: ", messageContent);
    setIsMessageModalVisible(false);
    setMessageContent("");
  };

  const handleMessageCancel = () => {
    setIsMessageModalVisible(false);
  };

  const handleBan = async (id) => {
    try {
      const response = await banUser(id).unwrap();
      console.log(response);
      if (response?.success) {
        toast.success(response?.message || "User banned successfully!");
      } else {
        toast.error(response?.message || "Failed to ban user.");
      }
    } catch (error) {
      toast.error(
        error?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      render: (_, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        const name = record.name || "Unknown";
        const imgUrl = record.profile || randomImg;
        const fullImgUrl = imgUrl.startsWith("http")
          ? imgUrl
          : `${imageUrl}${imgUrl}`;

        return (
          <Space>
            <Avatar src={fullImgUrl} alt={name} size="large" />
            <span>{name}</span>
          </Space>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span>
          {status === "Active" ? (
            <span className="text-green-600">Active</span>
          ) : (
            <span className="text-red-600">Inactive</span>
          )}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Link to={`/user/profile/${record._id}`}>
            <Button className="bg-white text-primary border border-primary">
              Details
            </Button>
          </Link>
          <Button
            onClick={() => handleBan(record._id)}
            className={`border px-5 border-button ${record.userBan === false
              ? "bg-button"
              : "bg-green-900 !hover:bg-green-900 border-green-900"
              } hover:!bg-red-900 text-white`}
          >
            {record.userBan === false ? "Ban" : "Unban"}
          </Button>
          <div
            className="border border-primary p-1 rounded-lg cursor-pointer"
            onClick={showMessageModal}
          >
            <BiSolidMessageDetail
              size={24}
              className="text-primary shadow-2xl"
            />
          </div>
        </Space>
      ),
    },
  ];

  return (
    <div className=" bg-white p-5 rounded-2xl">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold">Users</h1>
        <div className="flex items-center">
          <Input
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: 200,
              height: 42,
              marginRight: 10,
              borderRadius: 12,
            }}
          />
          <Button
            className="bg-primary rounded-xl text-white py-5"
            onClick={showModal}
          >
            <IoMdAdd size={20} /> Add User
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        loading={isLoading}
        dataSource={filteredUsers}
        pagination={{ pageSize, onChange: () => setPageSize() }}
        scroll={{ x: 1000 }}
        rowKey="_id"
      />

      <Modal
        title="Create New User"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={700}
        className="custom-modal"
      >
        <div className="p-10">
          <Form layout="vertical" onFinish={handleOk}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input style={{ height: 45 }} placeholder="Enter name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input the email!" }]}
            >
              <Input style={{ height: 45 }} placeholder="Enter email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input the password!" },
              ]}
            >
              <Input.Password
                style={{ height: 45 }}
                placeholder="Enter password"
              />
            </Form.Item>
            <Form.Item
              name="contact"
              label="Contact"
              rules={[
                { required: true, message: "Please input the contact number!" },
              ]}
            >
              <Input style={{ height: 45 }} placeholder="Enter contact" />
            </Form.Item>
            <Form.Item>
              <Button
                className="bg-primary py-5 w-[40%] text-white"
                htmlType="submit"
              >
                Create User
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      <Modal
        title="Send Message"
        open={isMessageModalVisible}
        onCancel={handleMessageCancel}
        footer={null}
        className="custom-modal"
      >
        <Form layout="vertical" onFinish={handleMessageOk}>
          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: "Please input your message!" }]}
          >
            <Input.TextArea rows={4} placeholder="Type your message here" />
          </Form.Item>
          <Form.Item>
            <Button
              className="bg-primary py-5 w-[40%] text-white"
              htmlType="submit"
            >
              Send
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;

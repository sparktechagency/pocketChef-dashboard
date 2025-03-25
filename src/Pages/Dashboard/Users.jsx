import React, { useState } from "react";
import { Table, Button, Space, Avatar, Input, Modal, Form } from "antd";
import { Link } from "react-router-dom";
import randomImg from "../../assets/randomProfile2.jpg";
import { FaIcons } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { BiSolidMessageDetail } from "react-icons/bi";
import { useUsersQuery } from "../../redux/apiSlices/userSlice";
import { imageUrl } from "../../redux/api/baseApi";

const Users = () => {
  const { data: getUsers, isLoading } = useUsersQuery();
  const userData = getUsers?.data;

  console.log(userData);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
  const [messageContent, setMessageContent] = useState("");

  // Dummy data for users
  const users = {
    data: {
      data: [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          phoneNumber: "+123456789",
          address: "123 Main St, Springfield",
          totalServices: 12,
          status: "Active",
          profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
          fine: 50,
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          phoneNumber: "+987654321",
          address: "456 Elm St, Springfield",
          totalServices: 5,
          status: "Active",
          profileImg: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        {
          id: "3",
          name: "Sam Wilson",
          email: "sam@example.com",
          phoneNumber: "+192837465",
          address: "789 Oak St, Springfield",
          totalServices: 3,
          status: "Active",
          profileImg: "https://randomuser.me/api/portraits/men/3.jpg",
          fine: 30,
        },
        {
          id: "4",
          name: "Emily Johnson",
          email: "emily@example.com",
          phoneNumber: "+456789123",
          address: "321 Pine St, Springfield",
          totalServices: 8,
          status: "Active",
          profileImg: "https://randomuser.me/api/portraits/women/4.jpg",
          fine: 0,
        },
        {
          id: "5",
          name: "Michael Brown",
          email: "michael@example.com",
          phoneNumber: "+789456123",
          address: "654 Maple St, Springfield",
          totalServices: 6,
          status: "Active",
          profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
        },
        {
          id: "6",
          name: "Sophia Davis",
          email: "sophia@example.com",
          phoneNumber: "+123987654",
          address: "987 Birch St, Springfield",
          totalServices: 7,
          status: "Active",
          profileImg: "https://randomuser.me/api/portraits/women/6.jpg",
          fine: 40,
        },
        {
          id: "7",
          name: "David Wilson",
          email: "david@example.com",
          phoneNumber: "+456321789",
          address: "321 Cedar St, Springfield",
          totalServices: 10,
          status: "Active",
          profileImg: "https://randomuser.me/api/portraits/men/7.jpg",
        },
        {
          id: "8",
          name: "Olivia Miller",
          email: "olivia@example.com",
          phoneNumber: "+789123456",
          address: "654 Walnut St, Springfield",
          totalServices: 9,
          status: "Active",
          profileImg: "https://randomuser.me/api/portraits/women/8.jpg",
        },
        {
          id: "9",
          name: "Liam Martinez",
          email: "liam@example.com",
          phoneNumber: "+123456987",
          address: "987 Cedar St, Springfield",
          totalServices: 4,
          status: "Inactive",
          profileImg: "https://randomuser.me/api/portraits/men/9.jpg",
          fine: 25,
        },
        {
          id: "10",
          name: "Ava Hernandez",
          email: "ava@example.com",
          phoneNumber: "+456987123",
          address: "321 Birch St, Springfield",
          totalServices: 11,
          status: "Active",
          profileImg: "https://randomuser.me/api/portraits/women/10.jpg",
        },
        {
          id: "11",
          name: "James Anderson",
          email: "james@example.com",
          phoneNumber: "+789123789",
          address: "654 Pine St, Springfield",
          totalServices: 5,
          status: "Active",
          profileImg: "https://randomuser.me/api/portraits/men/11.jpg",
        },
        {
          id: "12",
          name: "Isabella Garcia",
          email: "isabella@example.com",
          phoneNumber: "+123789456",
          address: "987 Maple St, Springfield",
          totalServices: 13,
          status: "Active",
          profileImg: "https://randomuser.me/api/portraits/women/12.jpg",
        },
        {
          id: "13",
          name: "Lucas Martinez",
          email: "lucas@example.com",
          phoneNumber: "+456321654",
          address: "321 Walnut St, Springfield",
          totalServices: 6,
          status: "Active",
          profileImg: "https://randomuser.me/api/portraits/men/13.jpg",
        },
        {
          id: "14",
          name: "Emma Harris",
          email: "emma@example.com",
          phoneNumber: "+789654321",
          address: "654 Cedar St, Springfield",
          totalServices: 7,
          status: "Active",
          profileImg: "https://randomuser.me/api/portraits/women/14.jpg",
          fine: 35,
        },
        {
          id: "15",
          name: "Ethan Thompson",
          email: "ethan@example.com",
          phoneNumber: "+123321456",
          address: "987 Pine St, Springfield",
          totalServices: 8,
          status: "Inactive",
          profileImg: "https://randomuser.me/api/portraits/men/15.jpg",
        },
      ],
    },
  };

  const data = users?.data?.data;

  const filteredUsers = data.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
          <Button className="border px-5 border-button bg-button hover:!bg-red-900 text-white">
            Ban
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
        dataSource={userData}
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

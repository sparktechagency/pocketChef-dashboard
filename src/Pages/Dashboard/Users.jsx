import React, { useState } from "react";
import { Table, Button, Space, Avatar } from "antd";
import { Link } from "react-router-dom";
import randomImg from "../../assets/randomProfile2.jpg";

const Users = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageSize, setPageSize] = useState(10);

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
          status: "VIP",
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
          status: "Regular",
          profileImg: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        {
          id: "3",
          name: "Sam Wilson",
          email: "sam@example.com",
          phoneNumber: "+192837465",
          address: "789 Oak St, Springfield",
          totalServices: 3,
          status: "New",
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
          status: "VIP",
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
          status: "Regular",
          profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
        },
        {
          id: "6",
          name: "Sophia Davis",
          email: "sophia@example.com",
          phoneNumber: "+123987654",
          address: "987 Birch St, Springfield",
          totalServices: 7,
          status: "New",
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
          status: "VIP",
          profileImg: "https://randomuser.me/api/portraits/men/7.jpg",
        },
        {
          id: "8",
          name: "Olivia Miller",
          email: "olivia@example.com",
          phoneNumber: "+789123456",
          address: "654 Walnut St, Springfield",
          totalServices: 9,
          status: "Regular",
          profileImg: "https://randomuser.me/api/portraits/women/8.jpg",
        },
        {
          id: "9",
          name: "Liam Martinez",
          email: "liam@example.com",
          phoneNumber: "+123456987",
          address: "987 Cedar St, Springfield",
          totalServices: 4,
          status: "New",
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
          status: "VIP",
          profileImg: "https://randomuser.me/api/portraits/women/10.jpg",
        },
        {
          id: "11",
          name: "James Anderson",
          email: "james@example.com",
          phoneNumber: "+789123789",
          address: "654 Pine St, Springfield",
          totalServices: 5,
          status: "Regular",
          profileImg: "https://randomuser.me/api/portraits/men/11.jpg",
        },
        {
          id: "12",
          name: "Isabella Garcia",
          email: "isabella@example.com",
          phoneNumber: "+123789456",
          address: "987 Maple St, Springfield",
          totalServices: 13,
          status: "New",
          profileImg: "https://randomuser.me/api/portraits/women/12.jpg",
        },
        {
          id: "13",
          name: "Lucas Martinez",
          email: "lucas@example.com",
          phoneNumber: "+456321654",
          address: "321 Walnut St, Springfield",
          totalServices: 6,
          status: "VIP",
          profileImg: "https://randomuser.me/api/portraits/men/13.jpg",
        },
        {
          id: "14",
          name: "Emma Harris",
          email: "emma@example.com",
          phoneNumber: "+789654321",
          address: "654 Cedar St, Springfield",
          totalServices: 7,
          status: "Regular",
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
          status: "New",
          profileImg: "https://randomuser.me/api/portraits/men/15.jpg",
        },
      ],
    },
  };

  const data = users?.data?.data;

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        const name = record.name || "Unknown";
        const imgUrl = record.profileImg || randomImg;
        const fullImgUrl = imgUrl.startsWith("http")
          ? imgUrl
          : `${import.meta.env.VITE_BASE_URL}${imgUrl}`;

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
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Activity",
      dataIndex: "totalServices",
      key: "totalServices",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "VIP":
            color = "orange";
            break;
          case "Regular":
            color = "blue";
            break;
          case "New":
            color = "green";
            break;
          default:
            color = "green";
        }

        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: "Fine",
      dataIndex: "fine",
      key: "fine",
      render: (fine) =>
        fine ? (
          <span style={{ color: "red" }}>${fine}</span>
        ) : (
          <span className="text-green-700">No Fine</span>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Link to={`/user/profile/${record.id}`}>
            <Button className="bg-[#FFF4E3] text-[#F3B806] border-none">
              Details
            </Button>
          </Link>
          <Button className="border border-red-600 text-red-700">
            Restrict
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-semibold  my-5">Users</h1>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize, onChange: () => setPageSize() }}
        scroll={{ x: 1000 }}
      />
    </>
  );
};

export default Users;

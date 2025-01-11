import React from "react";
import { Button, ConfigProvider, Input, Tabs, Table } from "antd";
import { Link, useParams } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import RunningOrderTable from "../../components/ui/Analytics/RunningOrderTable";

const User = () => {
  const { id } = useParams();

  // Sample user data
  const user = {
    name: "John Doe",
    id: "#5568164",
    email: "johndoe@example.com",
    address: {
      street: "123 Main St",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "USA",
    },
    phone: "+1 (555) 123-4567",
    imgUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  };

  const imgUrl =
    user?.imgUrl ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmtj40PvvTQ1g64pgKZ2oKEk-tqT9rA4CXSA&s";

  // Dummy data for request history
  const requestHistory = [
    {
      requestId: "1",
      description: "Request for a new haircut style.",
      date: "2025-01-10",
      status: "Pending",
    },
    {
      requestId: "2",
      description:
        "Request for a facial treatment. Request for a facial treatment. Request for a facial treatment. Request for a facial treatment. Request for a facial treatment. Request for a facial treatment. Request for a facial treatment. Request for a facial treatment. Request for a facial treatment. Request for a facial treatment. Request for a facial treatment. Request for a facial treatment. ",
      date: "2025-01-09",
      status: "Approved",
    },
    {
      requestId: "3",
      description:
        "Request for a manicure service. Request for a manicure service. Request for a manicure service. Request for a manicure service. ",
      date: "2025-01-08",
      status: "Pending",
    },
  ];

  const columns = [
    {
      title: "Request ID",
      dataIndex: "requestId",
      key: "requestId",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <div className="w-[800px] line-clamp-1">{text}</div> // Adjust the width as needed
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span>
          {status === "Pending" ? (
            <span className="text-yellow-600">Pending</span>
          ) : (
            <span className="text-green-600">Approved</span>
          )}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="">
        <div className="flex items-center justify-between w-[1080px]">
          <div className="flex gap-3 items-center ">
            <img
              className="rounded-full w-16 h-16"
              src={
                imgUrl?.startsWith("http")
                  ? imgUrl
                  : `${import.meta.env.VITE_BASE_URL}${imgUrl}`
              }
              alt="img"
            />
            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-sm text-gray-400">User ID: {user.id} </p>
            </div>
          </div>
          <div className="space-x-4">
            <Button className="bg-button text-white py-5 rounded-2xl text-lg px-10">
              Ban User
            </Button>
            <Button className="bg-primary text-white py-5 rounded-2xl text-lg px-10">
              Send Message
            </Button>
          </div>
        </div>
        <div className="grid my-5 grid-cols-2 gap-5 w-[70%]">
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Name
            </h1>
            <p className="text-lg my-2">{user?.name}</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Email
            </h1>
            <p className="text-lg my-2">{user?.email}</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Phone
            </h1>
            <p className="text-lg my-2">{user?.phone}</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Address
            </h1>
            <p className="text-lg my-2">
              {user?.address ? (
                <>
                  {user?.address?.street}, {user?.address?.state},{" "}
                  {user?.address?.city}, {user?.address?.country}
                </>
              ) : (
                "N/A"
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="my-10 bg-white p-5 rounded-2xl">
        <h1 className="text-2xl font-bold">Request History</h1>
        <Table
          columns={columns}
          dataSource={requestHistory}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default User;

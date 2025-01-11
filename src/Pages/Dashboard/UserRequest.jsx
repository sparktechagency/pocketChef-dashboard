import React, { useState } from "react";
import { Table, Button, Space, Avatar, Modal, Switch } from "antd";

const UserRequest = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Dummy data for user requests
  const userRequests = [
    {
      id: "1",
      name: "John Doe",
      profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
      request:
        "Request for a new haircut style. Request for a new haircut style. Request for a new haircut style. Request for a new haircut style. Request for a new haircut style. Request for a new haircut style. Request for a new haircut style. Request for a new haircut style. Request for a new haircut style. Request for a new haircut style. Request for a new haircut style. Request for a new haircut style.",
      status: "Pending",
    },
    {
      id: "2",
      name: "Jane Smith",
      profileImg: "https://randomuser.me/api/portraits/women/2.jpg",
      request:
        "Request for a facial treatment. Request for a facial treatment. Request for a facial treatment. Request for a facial treatment. Request for a facial treatment. Request for a facial treatment. Request for a facial treatment. Request for a facial treatment. Request for a facial treatment. Request for a facial treatment. Request for a facial treatment. Request for a facial treatment.",
      status: "Approved",
    },
    {
      id: "3",
      name: "Sam Wilson",
      profileImg: "https://randomuser.me/api/portraits/men/3.jpg",
      request:
        "Request for a manicure service. Request for a manicure service. Request for a manicure service. Request for a manicure service. Request for a manicure service. Request for a manicure service. Request for a manicure service. Request for a manicure service. Request for a manicure service. Request for a manicure service. Request for a manicure service. Request for a manicure service.",
      status: "Pending",
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space>
          <Avatar src={record.profileImg} alt={record.name} size="large" />
          <span>{record.name}</span>
        </Space>
      ),
    },
    {
      title: "Request",
      dataIndex: "request",
      key: "request",

      width: 700,
      render: (text, record) => (
        <div>
          <p className="line-clamp-1">{record.request}</p>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Switch checkedChildren="Approved" unCheckedChildren="Pending" />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          onClick={() => {
            setSelectedRequest(record);
            setIsModalVisible(true);
          }}
        >
          Details
        </Button>
      ),
    },
  ];

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRequest(null);
  };

  return (
    <div className="bg-white p-6 rounded-2xl">
      <h1 className="text-2xl font-semibold my-5">User Requests</h1>
      <Table
        columns={columns}
        dataSource={userRequests}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Request Details"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        className="custom-modal"
      >
        <div className="space-y-4">
          <div>
            <h1 className="text-lg font-semibold mb-1">Name:</h1>
            <p className="text-xl font-bold">{selectedRequest?.name}</p>
          </div>
          <div>
            <h1 className="text-lg font-semibold mb-1">Request:</h1>
            <p className="text-xl border p-3 text-justify bg-white rounded-2xl">
              {" "}
              {selectedRequest?.request}
            </p>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Status:</h1>
            <p
              className={`text-xl ${
                selectedRequest?.status === "Approved"
                  ? "text-green-500"
                  : "text-orange-400"
              } font-bold`}
            >
              {" "}
              {selectedRequest?.status}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserRequest;

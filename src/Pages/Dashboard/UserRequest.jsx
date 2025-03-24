import React, { useState } from "react";
import { Table, Button, Space, Avatar, Modal, Switch, Spin } from "antd";
import {
  useRequestedRecipesQuery,
  useUpdateRequestStatusMutation,
} from "../../redux/apiSlices/recipeSlice";
import { imageUrl } from "../../redux/api/baseApi";
import toast from "react-hot-toast";

const UserRequest = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const { data: requestedRecipes, isLoading } = useRequestedRecipesQuery();
  const [changeStatus] = useUpdateRequestStatusMutation();

  if (isLoading) {
    return (
      <div>
        <Spin />
      </div>
    );
  }

  const userRequestData = requestedRecipes?.data;
  console.log("userRequestData", userRequestData);

  const handleStatusChange = async (id, checked) => {
    const newStatus = checked ? "approved" : "pending";

    try {
      await changeStatus({
        id,
        body: { status: newStatus },
      }).unwrap();

      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      toast.error(err.data?.message || "Failed to update status");
    }
  };

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
      render: (text, record) => (
        <Space>
          <Avatar
            src={
              record?.userId?.profile?.startsWith("http")
                ? record?.userId?.profile
                : `${imageUrl}${record?.userId?.profile}`
            }
            alt={record?.userId?.name}
            size="large"
          />
          <span>{record?.userId?.name}</span>
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
          <p className="line-clamp-1">{record?.RequestRecipeBody}</p>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Switch
          checked={record?.status === "approved"}
          checkedChildren="Approved"
          unCheckedChildren="Pending"
          onChange={(checked) => handleStatusChange(record._id, checked)}
        />
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
        dataSource={userRequestData}
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
            <p className="text-xl font-bold">{selectedRequest?.userId?.name}</p>
          </div>
          <div>
            <h1 className="text-lg font-semibold mb-1">Request:</h1>
            <p className="text-md border p-3 text-justify bg-white rounded-2xl">
              {" "}
              {selectedRequest?.RequestRecipeBody}
            </p>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Status:</h1>
            <p
              className={`text-xl ${
                selectedRequest?.status === "approved"
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

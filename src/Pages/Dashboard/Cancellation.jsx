import React, { useState } from "react";
import { Table, Tag, Space, Select } from "antd";

const { Option } = Select;

const Cancellation = () => {
  // Sample data for cancelled orders
  const [statusFilter, setStatusFilter] = useState("All");

  const cancelledOrders = [
    {
      key: "1",
      orderId: "ORD123",
      customerName: "John Doe",
      barberName: "Alex Smith",
      service: "Men's Haircut",
      amount: "$50",
      cancellationReason: "User was unavailable at the scheduled time.",
      status: "Mutual Cancellation",
      date: "2024-12-20",
    },
    {
      key: "2",
      orderId: "ORD124",
      customerName: "Jane Doe",
      barberName: "Sarah Johnson",
      service: "Women's Hair Styling",
      amount: "$60",
      cancellationReason: "Barber requested cancellation due to running late.",
      status: "Cancelled by Barber with Complaint",
      date: "2024-12-19",
    },
    {
      key: "3",
      orderId: "ORD125",
      customerName: "Alice White",
      barberName: "Mike Brown",
      service: "Color Treatments",
      amount: "$70",
      cancellationReason: "Customer changed plans.",
      status: "Mutual Cancellation",
      date: "2024-12-18",
    },
    {
      key: "4",
      orderId: "ORD126",
      customerName: "David Black",
      barberName: "Emily Clark",
      service: "Spa Treatments",
      amount: "$90",
      cancellationReason: "Barber unable to perform due to injury.",
      status: "Cancelled by Barber with Complaint",
      date: "2024-12-17",
    },
    {
      key: "5",
      orderId: "ORD127",
      customerName: "Lily Adams",
      barberName: "Alex Smith",
      service: "Hand Care",
      amount: "$40",
      cancellationReason: "User was unresponsive.",
      status: "Mutual Cancellation",
      date: "2024-12-16",
    },
    {
      key: "6",
      orderId: "ORD128",
      customerName: "Matthew Johnson",
      barberName: "Sarah Johnson",
      service: "Foot Care",
      amount: "$50",
      cancellationReason: "Barber had scheduling conflict.",
      status: "Cancelled by Barber with Complaint",
      date: "2024-12-15",
    },
    {
      key: "7",
      orderId: "ORD129",
      customerName: "Emily Wilson",
      barberName: "John Smith",
      service: "Body Massage",
      amount: "$80",
      cancellationReason: "User initiated cancellation due to inconvenience.",
      status: "Cancelled by User",
      date: "2024-12-14",
    },
    {
      key: "8",
      orderId: "ORD130",
      customerName: "Daniel Lee",
      barberName: "Sara Lee",
      service: "Skin Exfoliation",
      amount: "$60",
      cancellationReason: "Barber had to cancel with a complaint for the user.",
      status: "Cancelled by Barber with Complaint",
      date: "2024-12-13",
    },
    // Add more sample data as needed
  ];

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Barber Name",
      dataIndex: "barberName",
      key: "barberName",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Cancellation Reason",
      dataIndex: "cancellationReason",
      key: "cancellationReason",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Mutual Cancellation", value: "Mutual Cancellation" },
        {
          text: "Cancelled by Barber with Complaint",
          value: "Cancelled by Barber with Complaint",
        },
        { text: "Cancelled by User", value: "Cancelled by User" },
      ],
      onFilter: (value, record) => record.status.includes(value),
      render: (status) => {
        let color;
        if (status === "Mutual Cancellation") color = "orange";
        else if (status === "Cancelled by Barber with Complaint") color = "red";
        else color = "blue"; // User cancellation
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  const handleStatusChange = (value) => {
    setStatusFilter(value);
  };

  const filteredOrders =
    statusFilter === "All"
      ? cancelledOrders
      : cancelledOrders.filter((order) => order.status === statusFilter);

  return (
    <div>
      <h1 className="text-2xl font-semibold  my-5">Cancelled Orders</h1>
      <Select
        defaultValue="All"
        onChange={handleStatusChange}
        style={{ marginBottom: 16 }}
      >
        <Option value="All">All</Option>
        <Option value="Mutual Cancellation">Mutual Cancellation</Option>
        <Option value="Cancelled by Barber with Complaint">
          Cancelled by Barber with Complaint
        </Option>
        <Option value="Cancelled by User">Cancelled by User</Option>
      </Select>
      <Table columns={columns} dataSource={filteredOrders} />
    </div>
  );
};

export default Cancellation;

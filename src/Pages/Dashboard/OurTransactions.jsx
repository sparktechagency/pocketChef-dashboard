import React, { useState } from "react";
import { Table, DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

const transactions = [
  {
    key: "1",
    transactionId: "TXN001",
    customerName: "John Doe",
    serviceName: "Haircut",
    barberName: "Mike Johnson",
    price: 100,
    adminEarning: 15,
    date: "2024-06-15 10:30:00",
  },
  {
    key: "2",
    transactionId: "TXN002",
    customerName: "Jane Smith",
    serviceName: "Hair Color",
    barberName: "Sarah Brown",
    price: 200,
    adminEarning: 30,
    date: "2024-06-14 14:45:00",
  },
  {
    key: "3",
    transactionId: "TXN003",
    customerName: "Robert White",
    serviceName: "Beard Trim",
    barberName: "David Green",
    price: 80,
    adminEarning: 12,
    date: "2024-06-16 09:15:00",
  },
  // Add 12 more transactions
  {
    key: "15",
    transactionId: "TXN015",
    customerName: "Henry Miller",
    serviceName: "Haircut",
    barberName: "Daniel King",
    price: 115,
    adminEarning: 17.25,
    date: "2024-06-04 12:30:00",
  },
];

const OurTransactions = () => {
  const [filteredData, setFilteredData] = useState(transactions);

  const columns = [
    {
      title: "Date & Time",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => moment(a.date).valueOf() - moment(b.date).valueOf(),
      render: (date) => moment(date).format("DD-MM-YYYY HH:mm A"),
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    { title: "Customer Name", dataIndex: "customerName", key: "customerName" },
    { title: "Service Name", dataIndex: "serviceName", key: "serviceName" },
    { title: "Barber Name", dataIndex: "barberName", key: "barberName" },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Admin Earning ($)",
      dataIndex: "adminEarning",
      key: "adminEarning",
      render: (earning) => (
        <span className="text-green-600 font-medium">
          ${earning.toFixed(2)}
        </span>
      ),
      sorter: (a, b) => a.adminEarning - b.adminEarning,
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-start">
        Our Transactions
      </h1>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default OurTransactions;

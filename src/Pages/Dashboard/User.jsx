import React from "react";
import {
  Button,
  ConfigProvider,
  Input,
  Tabs,
  Table,
  Spin,
  Tooltip,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import RunningOrderTable from "../../components/ui/Analytics/RunningOrderTable";
import { useGetSingleUserQuery } from "../../redux/apiSlices/userSlice";
import { imageUrl } from "../../redux/api/baseApi";
import { useRecipeRequestBySingleUserQuery } from "../../redux/apiSlices/recipeSlice";
import moment from "moment";

const User = () => {
  const { id } = useParams();

  const { data: getSingleUser, isLoading } = useGetSingleUserQuery(id);
  const {
    data: recipeRequestBySingleUser,
    isLoading: recipeRequestBySingleUserLoading,
  } = useRecipeRequestBySingleUserQuery(id);

  if (isLoading || recipeRequestBySingleUserLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin />
      </div>
    );

  const userData = getSingleUser?.data;
  const recipeRequestData = recipeRequestBySingleUser?.data;
  console.log(recipeRequestData);

  const imgUrl =
    userData?.profile ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmtj40PvvTQ1g64pgKZ2oKEk-tqT9rA4CXSA&s";

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (text, record) => (
        <Tooltip title={text}>{text?.slice(0, 10)}</Tooltip>
      ),
    },
    {
      title: "Description",
      dataIndex: "RequestRecipeBody",
      key: "RequestRecipeBody",
      render: (text) => <div className="w-[600px]">{text}</div>,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span>
          {status === "pending" ? (
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
              className="rounded-full object-cover w-16 h-16"
              src={imgUrl?.startsWith("http") ? imgUrl : `${imageUrl}${imgUrl}`}
              alt="img"
            />
            <div>
              <h1 className="text-2xl font-bold">{userData?.name}</h1>
              <p className="text-sm text-gray-400">User ID: {userData?._id} </p>
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
            <p className="text-lg my-2">{userData?.name}</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Email
            </h1>
            <p className="text-lg my-2">{userData?.email}</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Phone
            </h1>
            <p className="text-lg my-2">{userData?.contact}</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Address
            </h1>
            <p className="text-lg my-2">{userData?.location || "N/A"}</p>
          </div>
        </div>
      </div>
      <div className="my-10 bg-white p-5 rounded-2xl">
        <h1 className="text-2xl font-bold">Request History</h1>
        <Table
          columns={columns}
          dataSource={recipeRequestData}
          pagination={{ pageSize: 5 }}
          rowKey="_id"
        />
      </div>
    </div>
  );
};

export default User;

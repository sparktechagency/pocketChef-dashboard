import React from "react";

import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import { Badge } from "antd";
import logo from "../../assets/randomProfile2.jpg";
import { useFetchAdminProfileQuery } from "../../redux/apiSlices/authSlice";
import { imageUrl } from "../../redux/api/baseApi";
import { useNotificationQuery } from "../../redux/apiSlices/notificationSlice";

const Header = () => {
  const { data: userData, isLoading } = useFetchAdminProfileQuery();
  const { data: notifications, isLoading: notificationLoading } =
    useNotificationQuery();

  if (isLoading || notificationLoading) {
    return (
      <div className="flex justify-center items-center my-20 text-lg text-secondary">
        Loading...
      </div>
    );
  }

  const profile = userData?.data;
  const notificationData = notifications?.data;

  return (
    <div className="flex items-center gap-5 justify-end">
      <Link to="/notification" className="h-fit mt-[10px]">
        <Badge
          count={
            notificationData?.filter((item) => item?.read === false).length
          }
        >
          <FaRegBell color="#4E4E4E" size={24} />
        </Badge>
      </Link>

      <div className="flex gap-2 items-center justify-center border-4 p-1 rounded-full">
        <img
          style={{
            clipPath: "circle()",
            width: 45,
            height: 45,
          }}
          src={
            profile?.profile
              ? profile?.profile?.startsWith("http")
                ? profile?.profile
                : `${imageUrl}${profile?.profile}`
              : logo
          }
          alt="person-male--v2"
          className="clip"
        />
        <div className="flex pr-2 flex-col">
          <p className="text-xl">{profile?.name || "Shakib Al Hasan"}</p>
          <p className="text-sm text-gray-500">{profile?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;

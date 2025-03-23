import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import {
  MdCancelPresentation,
  MdCategory,
  MdFeaturedPlayList,
  MdMiscellaneousServices,
} from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbUserScreen } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { PiCookingPotBold, PiUserPlus } from "react-icons/pi";
import { LuLayoutDashboard, LuLayoutTemplate } from "react-icons/lu";
import Cookies from "js-cookie";
import logo from "../../assets/logo.png";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaMoneyBillTransfer, FaScissors } from "react-icons/fa6";
import { FaBorderStyle } from "react-icons/fa";
import { RiAlignItemLeftLine } from "react-icons/ri";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const [selectedKey, setSelectedKey] = useState("");
  const [openKeys, setOpenKeys] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("refreshToken");
    Cookies.remove("refreshToken");
    navigate("/auth/login");
  };

  const menuItems = [
    {
      key: "/",
      icon: <LuLayoutDashboard size={24} />,
      label: (
        <Link to="/" className="">
          Dashboard
        </Link>
      ),
    },

    {
      key: "/users",
      icon: <TbUserScreen size={24} />,
      label: <Link to="/users">Users</Link>,
    },
    {
      key: "/user-request",
      icon: <TbUserScreen size={24} />,
      label: <Link to="/user-request">User Request</Link>,
    },
    {
      key: "/banner",
      icon: <LuLayoutTemplate size={24} />,
      label: <Link to="/banner">Banner</Link>,
    },
    {
      key: "/ingredients",
      icon: <RiAlignItemLeftLine size={24} />,
      label: <Link to="/ingredients">Ingredients</Link>,
    },
    {
      key: "subMenuCategory",
      icon: <PiCookingPotBold size={24} />,
      label: "Category",
      children: [
        {
          key: "/category",
          icon: <BiSolidCategoryAlt size={24} />,
          label: (
            <Link to="/category" className="text-white hover:text-white">
              Category
            </Link>
          ),
        },
        {
          key: "/sub-category",
          icon: <MdCategory size={24} />,
          label: (
            <Link to="/sub-category" className="text-white hover:text-white">
              Sub Category
            </Link>
          ),
        },
      ],
    },
    {
      key: "/recipe",
      icon: <FaBorderStyle size={24} />,
      label: <Link to="/recipe">Recipe</Link>,
    },

    {
      key: "subMenuSetting",
      icon: <IoSettingsOutline size={24} />,
      label: "Settings",
      children: [
        {
          key: "/personal-information",
          label: (
            <Link
              to="/personal-information"
              className="text-white hover:text-white"
            >
              Personal Information
            </Link>
          ),
        },
        {
          key: "/change-password",
          label: (
            <Link to="/change-password" className="text-white hover:text-white">
              Change Password
            </Link>
          ),
        },

        {
          key: "/terms-and-condition",
          label: (
            <Link
              to="/terms-and-condition"
              className="text-white hover:text-white"
            >
              Terms And Condition
            </Link>
          ),
        },
        {
          key: "/privacy-policy",
          label: (
            <Link to="/privacy-policy" className="text-white hover:text-white">
              Privacy Policy
            </Link>
          ),
        },
      ],
    },
    {
      key: "/logout",
      icon: <IoIosLogOut size={24} />,
      label: <p onClick={handleLogout}>Logout</p>,
    },
  ];

  useEffect(() => {
    const selectedItem = menuItems.find(
      (item) =>
        item.key === path || item.children?.some((sub) => sub.key === path)
    );

    if (selectedItem) {
      setSelectedKey(path);

      if (selectedItem.children) {
        setOpenKeys([selectedItem.key]);
      } else {
        const parentItem = menuItems.find((item) =>
          item.children?.some((sub) => sub.key === path)
        );
        if (parentItem) {
          setOpenKeys([parentItem.key]);
        }
      }
    }
  }, [path]);

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <div className="mt-5 overflow-y-scroll">
      <div className="px-10">
        <Link
          to={"/"}
          className="mb-10 flex items-center border-b-2 border-[#154F92] pb-5 flex-col gap-2 justify-center py-4"
        >
          <img src={logo} alt="" />
        </Link>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        style={{ borderRightColor: "transparent", background: "transparent" }}
        items={menuItems}
      />
    </div>
  );
};

export default Sidebar;

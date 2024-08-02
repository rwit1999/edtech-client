'use client'
import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import avatarDefault from "../../../public/person-flat.png";
import {
  IoBarChartOutline,
  IoHomeOutline,
  IoMapOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { FaUsers } from "react-icons/fa6";
import {
  MdOutlineVideoCall,
  MdOndemandVideo,
  MdOutlineWebStories,
  MdArrowBackIos,
  MdArrowForwardIos,
  MdManageHistory,
} from "react-icons/md";
import { GoQuestion } from "react-icons/go";
import { BiCategoryAlt } from "react-icons/bi";
import { SiCoursera } from "react-icons/si";
import { signOut } from "next-auth/react";
import { useLogoutQuery } from "@/redux/features/auth/authApi";

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: (title: string) => void;
  isCollapsed: boolean;
}

const Item: FC<ItemProps> = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  isCollapsed,
}) => {
  return (
    <Link href={to}>
      <div
        className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
          selected === title
            ? "bg-blue-100 dark:bg-blue-800"
            : "hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
        onClick={() => setSelected(title)}
      >
        <div
          className={`menu-item-icon mr-3 text-gray-700 dark:text-gray-300 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          {icon}
        </div>
        {!isCollapsed && (
          <div className="menu-item-text text-gray-700 dark:text-gray-300">
            <span>{title}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState(""); // Initialize with an empty string
  const [mounted, setMounted] = useState(false); // Initialize with false to handle mount state
  const [logout, setLogout] = useState(false);
  useLogoutQuery(undefined, { skip: !logout });

  useEffect(() => {
    setMounted(true); // Set mounted to true on component mount
    const path = window.location.pathname;
    // Set the selected state based on the current pathname
    if (path.includes("/admin/users")) setSelected("Users");
    else if (path.includes("/admin/create-course")) setSelected("Create Course");
    else if (path.includes("/admin/courses")) setSelected("Live Course");
    else if (path.includes("/admin/team")) setSelected("Manage Team");
    else if (path.includes("/admin/course-analytics")) setSelected("Course Analytics");
    else if (path.includes("/admin/orders-analytics")) setSelected("Orders Analytics");
    else setSelected("User Analytics");
    // Add other routes as necessary
  }, []);

  if (!mounted) {
    return null; // Render nothing until component is mounted
  }

  const logOutHandler = async () => {
    setLogout(true);
    await signOut({ callbackUrl: 'http://localhost:8000/' });
  };

  return (
    <div
      className={`m-3 bg-white dark:bg-gray-900 shadow-md rounded-lg p-3 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <Link href={"/"}>
          <h3
            className={`text-xl font-semibold cursor-pointer text-gray-900 dark:text-gray-300 `}
          >
            Wiser
          </h3>
        </Link>
        <div className="relative w-20 h-20 border-2 border-blue-500 rounded-full">
          <Image
            src={user.avatar ? user.avatar.url : avatarDefault}
            alt="profile-user"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <Item
          title="Users"
          to="/admin/users"
          icon={<FaUsers />}
          selected={selected}
          setSelected={setSelected}
          isCollapsed={isCollapsed}
        />
        <Item
          title="Create Course"
          to="/admin/create-course"
          icon={<MdOutlineVideoCall />}
          selected={selected}
          setSelected={setSelected}
          isCollapsed={isCollapsed}
        />
        <Item
          title="Live Course"
          to="/admin/courses"
          icon={<MdOndemandVideo />}
          selected={selected}
          setSelected={setSelected}
          isCollapsed={isCollapsed}
        />
        <Item
          title="Manage Team"
          to="/admin/team"
          icon={<IoPeopleOutline />}
          selected={selected}
          setSelected={setSelected}
          isCollapsed={isCollapsed}
        />
        <Item
          title="Course Analytics"
          to="/admin/course-analytics"
          icon={<IoBarChartOutline />}
          selected={selected}
          setSelected={setSelected}
          isCollapsed={isCollapsed}
        />
        <Item
          title="Orders Analytics"
          to="/admin/orders-analytics"
          icon={<IoMapOutline />}
          selected={selected}
          setSelected={setSelected}
          isCollapsed={isCollapsed}
        />
        <Item
          title="User Analytics"
          to="/admin/users-analytics"
          icon={<MdManageHistory />}
          selected={selected}
          setSelected={setSelected}
          isCollapsed={isCollapsed}
        />
        <div
          className="flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => logOutHandler()}
        >
          <h5 className="ml-2 font-semibold text-sm text-red-500 dark:text-red-400">Logout</h5>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

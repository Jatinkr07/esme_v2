/* eslint-disable no-unused-vars */
import { Menu, Button } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import {
  DashboardOutlined,
  ShopOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen, onMenuClick }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/admin",
    },
    {
      key: "2",
      icon: <ShopOutlined />,
      label: "Categories",
      path: "/admin/categories",
    },
    {
      key: "3",
      icon: <ShopOutlined />,
      label: "Products",
      path: "/admin/products",
    },
    {
      key: "4",
      icon: <UserOutlined />,
      label: "Inventory",
      path: "/admin/inventory",
    },
    {
      key: "5",
      icon: <FileTextOutlined />,
      label: "Blogs",
      path: "/admin/blogs",
    },
    {
      key: "6",
      icon: <UserOutlined />,
      label: "Users",
      path: "/admin/user",
    },
    {
      key: "7",
      icon: <SettingOutlined />,
      label: "Loyalty Coupons",
      path: "/admin/coupons",
    },
    {
      key: "8",
      icon: <SettingOutlined />,
      label: "Gift Cards",
      path: "/admin/gift-cards",
    },
    {
      key: "9",
      icon: <ShopOutlined />,
      label: "Orders",
      path: "/admin/orders",
    },
    {
      key: "10",
      icon: <SettingOutlined />,
      label: "Payments",
      path: "/admin/payments",
    },
    {
      key: "11",
      icon: <SettingOutlined />,
      label: "Support",
      path: "/admin/support",
    },
    {
      key: "12",
      icon: <SettingOutlined />,
      label: "Reset Password",
      path: "/admin/reset-password",
    },
    {
      key: "13",
      icon: <LogoutOutlined />,
      label: "Logout",
      path: "/admin/logout",
    },
  ];

  const handleMenuClick = (item) => {
    if (onMenuClick) {
      onMenuClick(item);
    }
    navigate(item.path);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b to-[#877f6c] from-[#f4efdf] text-white shadow-2xl
          lg:relative lg:translate-x-0 lg:z-auto lg:shadow-none
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
     
          <div className="flex items-center justify-between p-4 border-b border-black lg:justify-center">
            <motion.h2
              className="text-xl font-bold lg:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src="/logo.png"
                className="object-cover w-16 h-16 lg:h-full lg:w-24"
              />
            </motion.h2>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-purple-200 lg:hidden"
            />
          </div>

          {/* Menu */}
          <div className="flex-1 overflow-y-auto">
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              className="text-white bg-transparent border-r-0"
              onClick={({ key }) =>
                handleMenuClick(menuItems.find((item) => item.key === key))
              }
            >
              {menuItems.map((item) => (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  className="py-3 mx-2 my-1 text-white rounded-lg hover:bg-[#F4F2EA] hover:text-black"
                >
                  <span className="text-sm font-medium lg:text-base">
                    {item.label}
                  </span>
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;

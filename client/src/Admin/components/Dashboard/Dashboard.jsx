/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { message, Button } from "antd";
import {
  LogoutOutlined,
  MenuOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import Sidebar from "../Sidebar/Sidebar";
import Categories from "../../pages/Categories/Categories";
import SectionPage from "../../pages/Products/SectionPage";
import InventoryTable from "../../pages/Inventory/InventoryTable";
import BlogsPage from "../../pages/Blogs/BlogsPage";
import UserTable from "../../pages/Users/UserTable";
import CouponManager from "../../pages/CouponManager/CouponManager";
import GiftCardManagement from "../../pages/Gift-Card/GiftCardManagement";
import OrderManagement from "../../pages/Orders/OrderManagement";
import PaymentsTable from "../../pages/Payments/PaymentTable";
import DashboardContent from "./DashboardContent";

const Dashboard = () => {
  const { isAuthenticated, logout, isLoading } = useAdmin();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const routeNames = {
    "/admin": "Dashboard",
    "/admin/categories": "Categories",
    "/admin/products": "Products",
    "/admin/inventory": "Inventory",
    "/admin/blogs": "Blogs",
    "/admin/users": "Users",
    "/admin/coupons": "Loyalty Coupons",
    "/admin/gift-cards": "Gift Cards",
    "/admin/orders": "Orders",
    "/admin/payments": "Payments",
    "/admin/support": "Support",
    "/admin/reset-password": "Reset Password",
  };

  const currentPageName = routeNames[location.pathname] || "Dashboard";

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    try {
      await logout();
      message.success("Logged out successfully!");
      navigate("/admin/login");
    } catch (error) {
      message.error("Logout failed!");
    }
  };

  const handleMenuClick = (item) => {
    if (item.key === "13") {
      handleLogout();
    }
  };

  const handleBack = () => {
    if (location.pathname !== "/admin") {
      navigate("/admin");
    } else {
      navigate(-1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex h-screen bg-gray-50"
    >
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onMenuClick={handleMenuClick}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <motion.header
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 py-3 bg-white border-b border-gray-200 shadow-sm lg:px-6 lg:py-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden"
                size="large"
              />
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={handleBack}
                size="large"
                className="text-gray-600"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900 lg:text-2xl">
                  {currentPageName}
                </h1>
                <p className="text-sm text-gray-500 lg:text-base">
                  Welcome back, admin
                </p>
              </div>
            </div>

            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              danger
              size={isMobile ? "middle" : "large"}
              className="flex items-center"
            >
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </motion.header>

        <main className="flex-1 p-4 overflow-y-auto lg:p-6">
          <Routes>
            <Route index element={<DashboardContent />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<SectionPage />} />
            <Route path="inventory" element={<InventoryTable />} />
            <Route path="blogs" element={<BlogsPage />} />
            <Route path="users" element={<UserTable />} />
            <Route path="coupons" element={<CouponManager />} />
            <Route path="gift-cards" element={<GiftCardManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="payments" element={<PaymentsTable />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </motion.div>
  );
};

export default Dashboard;

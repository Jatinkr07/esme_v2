/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { message, Button } from "antd";
import {
  LogoutOutlined,
  MenuOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import {
  Outlet,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import Sidebar from "../Sidebar/Sidebar";
import Categories from "../../pages/Categories/Categories";
// import ProductsPage from "../../pages/Products/ProductsPage";

const Dashboard = () => {
  const { isAuthenticated, logout } = useAdmin();
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
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!isAuthenticated) {
    window.location.href = "/admin/login";
    return null;
  }

  const handleLogout = () => {
    logout();
    message.success("Logged out successfully!");
    window.location.href = "/admin/login";
  };

  const handleMenuClick = (item) => {
    if (item.key === "13") {
      handleLogout();
    }
    console.log("Menu clicked:", item);
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

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <motion.header
          initial={{ y: -20 }}
          animate={{ y: 0 }}
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

        {/* Main Content Area */}
        <main className="flex-1 p-4 overflow-y-auto lg:p-6">
          <Routes>
            <Route
              index
              element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                  <div className="p-6 transition-shadow bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 lg:text-base">
                          Total Sales
                        </h3>
                        <p className="text-2xl font-bold text-green-600 lg:text-3xl">
                          1,256.00 AED
                        </p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-full">
                        <svg
                          className="w-6 h-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <span className="font-medium text-green-600">+12.5%</span>{" "}
                      from last month
                    </div>
                  </div>

                  <div className="p-6 transition-shadow bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 lg:text-base">
                          Orders
                        </h3>
                        <p className="text-2xl font-bold text-blue-600 lg:text-3xl">
                          24
                        </p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-full">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <span className="font-medium text-blue-600">+8.2%</span>{" "}
                      from last month
                    </div>
                  </div>

                  <div className="p-6 transition-shadow bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 lg:text-base">
                          Customers
                        </h3>
                        <p className="text-2xl font-bold text-purple-600 lg:text-3xl">
                          142
                        </p>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-full">
                        <svg
                          className="w-6 h-6 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <span className="font-medium text-purple-600">
                        +15.3%
                      </span>{" "}
                      from last month
                    </div>
                  </div>

                  <div className="p-6 transition-shadow bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 lg:text-base">
                          Products
                        </h3>
                        <p className="text-2xl font-bold text-orange-600 lg:text-3xl">
                          89
                        </p>
                      </div>
                      <div className="p-3 bg-orange-100 rounded-full">
                        <svg
                          className="w-6 h-6 text-orange-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <span className="font-medium text-orange-600">+5.1%</span>{" "}
                      from last month
                    </div>
                  </div>
                </motion.div>
              }
            />
            <Route path="categories" element={<Categories />} />
            {/* <Route path="products" element={<ProductsPage />} /> */}

            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
          <Outlet />
        </main>
      </div>
    </motion.div>
  );
};

export default Dashboard;

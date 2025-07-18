/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { message } from "antd";
import { motion } from "framer-motion";
import { useAdmin } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { login } = useAdmin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { username, password } = data;
    const success = login(username, password);
    if (success) {
      message.success("Logged in successfully!");
      navigate("/admin");
    } else {
      message.error("Invalid credentials!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" className="h-16" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="mt-1">
              <input
                {...register("username", { required: "Username is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter username"
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white transition bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default AdminLogin;

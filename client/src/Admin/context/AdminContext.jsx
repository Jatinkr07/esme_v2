import React, { createContext, useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import API_URL from "../../utils/api";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("adminToken")
  );
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient();

  const { isLoading } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.get(`${API_URL}/api/admin/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUser(data);
    },
    onError: () => {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("adminToken");
      delete axios.defaults.headers.common["Authorization"];
    },
    retry: 0,
    enabled: !!localStorage.getItem("adminToken"),
  });

  const login = async (data) => {
    const response = await axios.post(`${API_URL}/api/admin/login`, data);
    const token = response.data.token;
    localStorage.setItem("adminToken", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setIsAuthenticated(true);
    setUser(response.data.admin);
    return response.data;
  };

  const logout = async () => {
    const token = localStorage.getItem("adminToken");

    localStorage.removeItem("adminToken");
    delete axios.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
    setUser(null);
    queryClient.clear();

    try {
      if (token) {
        await axios.post(
          `${API_URL}/api/admin/logout`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      return { message: "Logged out successfully" };
    } catch (error) {
      console.error("Logout API call failed:", error.message);

      return { message: "Logged out successfully" };
    }
  };

  return (
    <AdminContext.Provider
      value={{ isAuthenticated, user, login, logout, isLoading }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);

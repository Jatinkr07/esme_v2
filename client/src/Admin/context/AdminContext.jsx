import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import API_URL from "../../utils/api";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   const token = Cookies.get("adminToken");
  //   if (token) {
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //   }
  // }, []);

  const { isLoading } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const token = Cookies.get("adminToken");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.get(`${API_URL}/api/admin/me`);
      return response.data;
    },
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUser(data);
    },
    onError: () => {
      setIsAuthenticated(false);
      setUser(null);
      Cookies.remove("adminToken");
      delete axios.defaults.headers.common["Authorization"];
    },
    retry: 0,
    enabled: !!Cookies.get("adminToken"),
  });

  const login = async (data) => {
    const response = await axios.post(`${API_URL}/api/admin/login`, data);
    const token = response.data.token;
    Cookies.set("adminToken", token, {
      expires: 7,
      secure: import.meta.env.NODE_ENV === "production",
      sameSite: import.meta.env.NODE_ENV === "production" ? "none" : "lax",
    });
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setIsAuthenticated(true);
    setUser(response.data.admin);
    return response.data;
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/api/admin/logout`);
      Cookies.remove("adminToken");
      delete axios.defaults.headers.common["Authorization"];
      setIsAuthenticated(false);
      setUser(null);
      queryClient.clear();
    } catch (error) {
      console.error("Logout failed:", error);
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

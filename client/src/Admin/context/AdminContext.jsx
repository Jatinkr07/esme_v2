import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem("isAuthenticated");
    return savedAuth ? JSON.parse(savedAuth) : false;
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    localStorage.setItem("user", JSON.stringify(user));
  }, [isAuthenticated, user]);

  const login = (username, password) => {
    if (username === "admin" && password === "99999") {
      setIsAuthenticated(true);
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);

    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);

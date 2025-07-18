import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutOutlet from "./layout/Outlet";
import { lazy } from "react";
import { AdminProvider } from "./Admin/context/AdminContext";
import AdminLogin from "./Admin/components/Auth/Login";
const Dashboard = lazy(() => import("./Admin/components/Dashboard/Dashboard"));
const HomePage = lazy(() => import("./pages/home/HomePage"));
const ShopPage = lazy(() => import("./pages/shop/ShopPage"));
const Register = lazy(() => import("./components/Auth/Register"));
const Login = lazy(() => import("./components/Auth/Login"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LayoutOutlet />}>
            <Route index element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route
            path="/admin/*"
            element={
              <AdminProvider>
                <Dashboard />
              </AdminProvider>
            }
          />
          <Route
            path="/admin/login"
            element={
              <AdminProvider>
                <AdminLogin />
              </AdminProvider>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

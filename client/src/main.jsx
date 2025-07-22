import { ConfigProvider } from "antd";
import { I18nextProvider } from "react-i18next";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import i18n from "./utils/i18n.js";
import { CartProvider } from "./context/CartContext.jsx";
import { AdminProvider } from "./Admin/context/AdminContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import "@ant-design/v5-patch-for-react-19";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:6600";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <I18nextProvider i18={i18n}>
    <ConfigProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
          <AdminProvider>
            <App />
          </AdminProvider>
        </QueryClientProvider>
      </CartProvider>
    </ConfigProvider>
  </I18nextProvider>
);

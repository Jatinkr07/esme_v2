import { ConfigProvider } from "antd";
import { I18nextProvider } from "react-i18next";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import i18n from "./utils/i18n.js";
import { CartProvider } from "./context/CartContext.jsx";
import { AdminProvider } from "./Admin/context/AdminContext";
import "@ant-design/v5-patch-for-react-19";

createRoot(document.getElementById("root")).render(
  <I18nextProvider i18n={i18n}>
    <ConfigProvider>
      <CartProvider>
        <AdminProvider>
          <App />
        </AdminProvider>
      </CartProvider>
    </ConfigProvider>
  </I18nextProvider>
);

import { ConfigProvider } from "antd";
import { I18nextProvider } from "react-i18next";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import i18n from "./utils/i18n.js";
import { CartProvider } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <I18nextProvider i18n={i18n}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          colorSecondary: "#52c41a",
        },
      }}
    >
      <CartProvider>
        {" "}
        <App />
      </CartProvider>
    </ConfigProvider>
  </I18nextProvider>
);

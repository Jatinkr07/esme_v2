import { Outlet } from "react-router-dom";
import Header from "./Header";
import CartSidebar from "../components/Cart/CartSidebar";
// import Footer from "./Footer";

const LayoutOutlet = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <CartSidebar />
      <main
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default LayoutOutlet;

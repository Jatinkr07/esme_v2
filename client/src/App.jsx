import LayoutOutlet from "./layout/Outlet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ShopPage from "./pages/shop/ShopPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutOutlet />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

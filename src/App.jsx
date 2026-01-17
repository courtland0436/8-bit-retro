import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Admin from "./pages/Admin.jsx";
import Header from "./components/Header.jsx";
import CartPage from "./pages/CartPage.jsx";

function App() {
  return (
    <>
      <Header /> {/* Will be the nav bar on all pages */}
      <Routes>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;

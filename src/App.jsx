import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Products from "./pages/products";
import ProductDetail from "./pages/product-detail";
import Registration from "./pages/registration";
import Login from "./pages/login";
import Checkout from "./pages/checkout";
import Congrats from "./pages/congrats";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/congrats" element={<Congrats />} />
    </Routes>
  );
}

export default App;
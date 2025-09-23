import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Products from "./pages/products";
import ProductDetail from "./pages/product-detail";

function App() {
 return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
 )
}

export default App

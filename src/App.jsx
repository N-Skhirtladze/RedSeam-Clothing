import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Products from "./pages/products";
import ProductDetail from "./pages/product-detail";
import Registration from "./pages/registration";
import Login from "./pages/login";

function App() {
 return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
 )
}

export default App

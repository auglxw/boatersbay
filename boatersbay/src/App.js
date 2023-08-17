import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './views/Home/Home';
import About from './views/About/About';
import FAQ from './views/FAQ/FAQ';
import Products from './views/Products/Products';
import ProductDetails from './views/ProductDetails/ProductDetails';
import Cart from './views/Cart/Cart';
import Admin from './views/Admin/Admin';
import Login from './views/Login/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/products" element={<Products/>} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

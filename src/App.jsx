import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Product from "./components/Product";
import CartPage from "./components/CartPage";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

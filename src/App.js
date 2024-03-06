import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { About } from "./components/pages/About";
import Menu from "./components/pages/Menu";
import Login from "./components/pages/Login";
import Cart from "./components/pages/Cart";
import AddProduct from "./components/pages/AddProduct";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container mx-auto ">
      <Routes>
        <Route path="/about" element={<About />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
       <Route path="/add-product" element={<AddProduct />}></Route>
      </Routes>
      </div>
    </div>
  );
}

export default App;

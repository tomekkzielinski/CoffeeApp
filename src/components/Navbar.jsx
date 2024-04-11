import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [amount, setAmount] = useState(0);

  const menuHandler = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {

    const fetchCartProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cart");
        setProducts(response.data);
        setCartProducts(response.data); // Ustawienie stanu cartProducts na podstawie danych pobranych z serwera
        var cartItems = (response.data);
        console.log("test-nav", cartItems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartProducts();
  }, []);

  useEffect(() => {
    // Obliczanie ilości produktów w koszyku
    if (cartProducts.length > 0) {
      const totalPrice = cartProducts.reduce((total, product) => {
        return total + (product.quantity);
      }, 0);
      setAmount(totalPrice.toFixed(0)); 
    } else {
      setAmount(0);
    }
  }, [cartProducts]);

  return (
    <nav>
      <Link to="/main-page" className="title">
        <img src="../../coffee-logo-1.png" alt="Coffee-App Logo" />
      </Link>

      <div className="menu" onClick={menuHandler}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="add-product">Dodaj produkt</NavLink>
        </li>
        <li>
          <NavLink to="menu">Menu</NavLink>
        </li>
        <li>
          <NavLink to="services">Promocje</NavLink>
        </li>
        <li>
          <NavLink to="login">Logowanie</NavLink>
        </li>
        <li>
          <NavLink to="cart">Koszyk <b>({amount})</b></NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

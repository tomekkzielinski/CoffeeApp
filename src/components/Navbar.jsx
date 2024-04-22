import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Navbar = ({ isLoggedIn,  handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
 

  const menuHandler = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cart");
        setCartProducts(response.data); // Ustawienie stanu cartProducts na podstawie danych pobranych z serwera
        var cartItems = response.data;
        console.log("test-nav", cartItems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartProducts();
  }, []);

 
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
        {isLoggedIn && (
          <>
            <li>
              <NavLink to="orders">Zamówienia</NavLink>
            </li>
            <li>
              <NavLink to="add-product">Dodaj produkt</NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="menu">Menu</NavLink>
        </li>
        <li>
          <NavLink to="services">Promocje</NavLink>
        </li>
        <li>
          {isLoggedIn ? (
            <a onClick={handleLogout}>Wyloguj</a>
          ) : (
            <NavLink to="login">Zaloguj</NavLink>
          )}
        </li>
        <li>
          <NavLink to="cart">
            Koszyk <b>({cartProducts.length})</b>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

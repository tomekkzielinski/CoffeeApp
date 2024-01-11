import {Link, NavLink} from 'react-router-dom';
import './Navbar.css'
import React, { useState } from 'react';



const Navbar = () => {

    const [menuOpen,setMenuOpen] =  useState(false); 

    const menuHandler = () => {
        setMenuOpen(!menuOpen);
    };

  return (
    <nav>
       
        <Link to='/' className="title">
          <img src="../../coffee-logo-1.png" alt="Coffee-App Logo" />
        </Link>
  


        <div className="menu" onClick={menuHandler}>
            <span></span>
            <span></span>
            <span></span>
        </div>
      <ul className={menuOpen ? "open" : ""}>
        <li><NavLink to='menu'>Menu</NavLink></li>
        <li><NavLink to='services'>Promocje</NavLink></li>
        <li><NavLink to='contact'>Kontakt</NavLink></li>
        <li><NavLink to='about'>O nas</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;

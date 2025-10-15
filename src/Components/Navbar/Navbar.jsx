import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router";
import { StoreContext } from "../../Context/StoreContext";

function Navbar({setShowLogin}) {
  const [menu, setMenu] = useState("Home");

  const {getTotalCartAmount}=useContext(StoreContext)

  return (
    <div className="navbar">
    <Link to='/'> <img src={assets.logo} alt="" className="logo" /></Link> 
      <ul className="navbar-menu">
        <Link to='/'
          id="Home"
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </Link>
        <a href="#explore-menu"
          onClick={() => setMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </a>
        <a href="#app-download"
          onClick={() => setMenu("Mobile-App")}
          className={menu === "Mobile-App" ? "active" : ""}
        >
          Mobile-App
        </a>
        <a href="#footer"
          onClick={() => setMenu("Contact Us")}
          className={menu === "Contact Us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />
        <div className="navbar-basket">
         <Link to='/cart'> <img src={assets.basket_icon} alt="Basket" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>

        <button onClick={()=>setShowLogin(true)}>Sign in</button>
      </div>
    </div>
  );
}

export default Navbar;
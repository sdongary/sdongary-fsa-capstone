import React, { useState } from "react";
import './Navbar.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'

const Navbar = () => {

  const [menu, setMenu] = useState("Electronics")

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <ul className="nav-menu">
        <li>Electronics</li>
        <li >Shoes & Apparel</li>
        <li>Health & Beauty</li>
        <li>Home Decor</li>
        <li>Furniture</li>
      </ul>
      <div className="nav-login-cart">
        <button>Login</button>
        <img src={cart_icon} alt="" />
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  )
}

export default Navbar
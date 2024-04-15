import React, { useState } from "react";
import './Navbar.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from "react-router-dom";

const Navbar = () => {

  const [menu, setMenu] = useState("shop")

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>

      <ul className="nav-menu">
        <li 
        onClick={() => {setMenu("shop")}}>
          <Link to='/'>Shop</Link>{menu === "shop"? <hr/>:<></>}
        </li>

        <li 
        onClick={() => {setMenu("electronics")}}>
          <Link to='/electronics'>Electronics</Link>{menu === "electronics"? <hr/>:<></>}
        </li>

        <li 
        onClick={() => {setMenu("shoes & apparel")}}>
          <Link to='/shoes & apparel'>Shoes & Apparel</Link>{menu === "shoes & apparel"? <hr/>:<></>}
        </li>

        <li 
        onClick={() => {setMenu("health & beauty")}}>
          <Link to='/health & beauty'>Health & Beauty</Link>{menu === "health & beauty"? <hr/>:<></>}
        </li>

        <li 
        onClick={() => {setMenu("home decor")}}>
          <Link to='/home decor'>Home Decor</Link>{menu === "home decor"? <hr/>:<></>}
        </li>

        <li 
        onClick={() => {setMenu("Furniture")}}>
          <Link to='/Furniture'>Furniture</Link>{menu === "Furniture"? <hr/>:<></>}
        </li>
      </ul>

      <div className="nav-login-cart">
        <Link to='/login'><button>Login</button></Link>
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        
        
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  )
}

export default Navbar
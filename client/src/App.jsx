import { useState } from 'react'
import './App.css'
import Footer from './Components/Footer/Footer';
// import Navbar from './Components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Navigation from "./Components/Navigation/Navigation";
import Home from "./Components/Home/Home";
import Account from "./Components/Account/Account";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Products from "./Components/Products/Products";
import SingleProduct from "./Components/SingleProduct/SingleProduct";
import SingleCategory from "./Components/SingleCategory/SingleCategory";
import MyCart from "./Components/MyCart/MyCart";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import logo from "./Components/Assets/logo.png"




function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null);
  
  return (
    <>
    
    {/* <h1 className="logo">
      <img
      src={logo}
      alt="ShopersStop logo" />
      ShoppersStop
    </h1> */}
    <div id="container">
      <Navigation token={token} />
      <div id="main section">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/account"
            element={<Account token={token} setToken={setToken} />}
          />
          <Route
            path="/register"
            element={
              <Register
                user={user}
                setUser={setUser}
                token={token}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                user={user}
                setUser={setUser}
                token={token}
                setToken={setToken}
              />
            }
          />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/:id"
            element={<SingleProduct token={token} />}
          />
          <Route path="/categories/:name" element={<SingleCategory />} />
          <Route path="/myCart" element={<MyCart token={token} />} />
          
          
        </Routes>
        
        <Footer />
      </div>
    </div>
  </>
);
}

export default App

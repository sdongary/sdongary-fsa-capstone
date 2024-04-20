import { useState } from 'react'
import './App.css'
import './Components/Navbar/Navbar';
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import Category from './Pages/Category';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import {Products} from './Pages/Products';
import Footer from './Components/Footer/Footer';
import { Register } from './Pages/Register';
import { SingleProduct } from './Pages/SingleProduct';



function App() {
  const [token, setToken] = useState(0)
  
  return (
    <div>
      <Navbar/>
      
      <Routes>

      <Route path="/" element={<Products/>}/> 
          
          <Route path='/electronics' element={<Category category="Electronics"/>}/> 
          <Route path='/shoes & apparel' element={<Category category="Shoes & Apparel"/>}/> 
          <Route path='/health & beauty' element={<Category category="Health & Beauty"/>}/> 
          <Route path='/home decor' element={<Category category="Home Decor"/>}/> 
          <Route path='/furniture' element={<Category category="Furniture"/>}/> 

          
          <Route path="/product" element={<Products/>}/>          
          <Route path=':productId' element={<SingleProduct token={token}/>}/>
          
          <Route path='/register' element={<Register token={token} setToken={setToken}/>}/>
          <Route path='/login' element={<LoginSignup token={token} setToken={setToken}/>}/>
          <Route path='/account' element={<Account token={token} setToken={setToken}/>}/>        
          <Route path='/cart' element={<Cart token={token} setToken={setToken}/>}/> 

          

      </Routes> 
      <Footer/>

      
    </div>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import './Components/Navbar/Navbar';
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import Category from './Pages/Category';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Product from './Pages/Product';
import Footer from './Components/Footer/Footer';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      
      <Navbar/>
      <Routes>

          <Route path='/' element={<Shop/>}/> 
          
          <Route path='/electronics' element={<Category category="Electronics"/>}/> 
          <Route path='/shoes & apparel' element={<Category category="Shoes & Apparel"/>}/> 
          <Route path='/health & beauty' element={<Category category="Health & Beauty"/>}/> 
          <Route path='/home decor' element={<Category category="Home Decor"/>}/> 
          <Route path='/furniture' element={<Category category="Furniture"/>}/> 

          <Route path="/product" element={<Product/>}>
           <Route path=':productId' element={<Product/>}/>
          </Route>

          <Route path='/cart' element={<Cart/>}/> 

          <Route path='/login' element={<LoginSignup/>}/> 

      </Routes> 
      <Footer/>
      
    </div>
  )
}

export default App

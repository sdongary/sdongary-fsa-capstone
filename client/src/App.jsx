import { useState } from 'react'
import './App.css'
import './Components/Navbar/Navbar'
import Navbar from './Components/Navbar/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
    </>
  )
}

export default App

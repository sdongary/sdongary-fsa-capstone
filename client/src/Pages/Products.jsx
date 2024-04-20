import { useEffect, useState } from "react"
import { API_URL } from "../main"



export function Products(){

  const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products/`);
      const result = await response.json();
      setProducts(result)
    } catch (error){
      console.log(error);
    }
  };
  fetchProducts();
},[]);

return (
  <div>
    <h1>Products</h1>
    <ul className="products">
      {products.filter((product) => product.name.toLowercase()).map((product) => {
        return (
          <li key={product.id} >
            <h2>{product.name}</h2>
            <img src="" alt="" />
            <h3>{product.name}</h3>
            <h3>{product.price}</h3>

          </li>
        )
      } )}
    </ul>
  </div>
)
}
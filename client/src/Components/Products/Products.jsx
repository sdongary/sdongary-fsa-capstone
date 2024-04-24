import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Categories from "../Categories/Categories";

const API_URL = 'http://localhost:3000/api';

export default function Products(){
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('')
  

useEffect(() => {
  const fetchProducts = async () => {
    
      const response = await fetch(`${API_URL}/products`);
      const result = await response.json();
      setProducts(result)
    
  };
  fetchProducts();
},[]);

const handleChange = (e) => {
  e.preventDefault();
  console.log(products);
  setSearch(e.target.value);
};

return (
  <>
  <div>
  <Categories />  
  </div>
  <div className="search-bar">
    <div className="input-wrapper">
      <input className="search-input" type="search" placeholder="Search for your product here"
      value={search} onChange={handleChange} />
    </div>

  </div>
      <ul className="products">
      {products.filter((product) => 
       product.name.toLowerCase()
      .match(search.toLowerCase())).map((product) => {
        return (
          <li key={product.id} className="product">
            <h3>{product.name}</h3>
            <img src={product.image} alt="product image" />
            <h3>Price: ${product.price}</h3>
            <button onClick={() => navigate(`/products/${product.id}`)}>
              View Product
            </button>
          </li>
        )
      } )}
    </ul>
  </>
)
}
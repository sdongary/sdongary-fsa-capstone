import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom"

const API_URL = 'http://localhost:3000/api';

export default function Categories(){
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${API_URL}/categories`);
      const result = await response.json();
      console.log(result);
      setCategories(result);
    }
    fetchCategories();
  }, []);

  return (
  <>
  <ul className="category">
  {categories.
  map((category) => {
    return (
      <li key={category.id} className="category">
        <h3>{category.name.toUpperCase()}</h3>
        <button onClick={() => navigate(`/categories/${category.name}`)}>
          View Products
        </button>
      </li>
      );
    })}
  </ul>
  </>
  );


}
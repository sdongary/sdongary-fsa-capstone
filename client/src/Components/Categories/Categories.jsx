import { useEffect, useState } from "react";
import { API_URL } from "../main";
import { useNavigate} from "react-router-dom"

export default function Categories(){
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${API_URL}/categories`);
      const result = await response.json();
      setCategories(result);
    }
    fetchCategories();
  }, []);

  return (
  <>
  <ul className="category">
  {categories.map((category) => {
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
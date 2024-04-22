import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../main";

export default function SingleCategory() {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const navigate = useNavigate();
  let { name } = useParams();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSingleCategory = async () => {
      try {
        const response = await fetch(`${API_URL}/categories/${name}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        setCategoryProducts(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCategory();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="singleCategory">
        <h1>{name.toUpperCase()}</h1>
        <div className="search-bar">
          <div className="input-wrapper">
            <input
              className="search-input"
              type="search"
              placeholder="Type to search for a product"
              value={search}
              onChange={handleChange}
            />
          </div>
        </div>
        <ul className="categoryProducts">
          {categoryProducts
            .filter((categoryProduct) =>
              categoryProduct.name.toLowerCase().match(search.toLowerCase())
            )
            .map((categoryProduct) => {
              return (
                <>
                  <li key={categoryProduct.id} className="product">
                    <h3>{categoryProduct.name}</h3>
                    <img src={categoryProduct.image} alt="product image" />
                    <p>Price: ${categoryProduct.price}</p>
                    <button
                      onClick={() => navigate(`/products/${categoryProduct.id}`)}
                    >
                      View Product
                    </button>
                  </li>
                </>
              );
            })}
        </ul>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </>
  );
}
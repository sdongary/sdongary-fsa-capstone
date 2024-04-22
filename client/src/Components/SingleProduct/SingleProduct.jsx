import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../main";

export function SingleProduct({token}){
  const [ product, setProduct] = useState({});
  const [ successMessage, setSuccessMessage ] = useState("");
  const [ error, setError ] = useState("");
  let { id } = useParams();

  useEffect(() => {
    const fetchSingleProduct = async() => {
      try{
        const response = await fetch(`${API_URL}/products/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        setProduct(result);
      } catch (error){
        console.error(error)
      }
    }
    fetchSingleProduct
  }, [])

  async function handleClick(){
    try {
      const response = await fetch(`${API_URL}mycart/cartItems`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1
        })
      });
      const result = await response.json();
      if (response.ok) {
        setSuccessMessage("Item is added to cart");
      } else {
        setError("Unable to add this item to cart");
      }
    } catch (error) {
      console.log(error);
     }
    }

  return(
    <>
      <div className="singleProduct">
        <h1>{product.name}</h1>
        <img src={product.image} alt="product image" />
        <h2>Description: {product.description}</h2>
        <p>Price: {product.price}</p>
        {token ? (
          <>
          <button onClick={()=>{handleClick()}}>Add Product</button>
          {successMessage && <p>{successMessage}</p>}
          {error && <p>{error}</p>}
          </>
        ) : (
          <p>Item is in stock, please log in</p>
        )}
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </>
  );
}
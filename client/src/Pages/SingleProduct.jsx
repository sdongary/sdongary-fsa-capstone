import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../main";

export function SingleProduct({token}){
  const [ product, setProduct] = useState({});
  const [ successMessage, setSuccessMessage ] = useState("");
  const [ error, setError ] = useState("");
  const { productId } = useParams();

  useEffect(() => {
    async function fetchSingleProduct(){
      try{
        const response = await fetch(`${API_URL}/api/products/${productId}`);
        const result = await response.json();
        setProduct(result);
      } catch (error){
        console.error(error)
      }
    }
    fetchSingleProduct
  }, [productId])

  async function handleClick(){
    try {
      const response = await fetch(`${API_URL}/api/mycart`,{
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
      setSuccessMessage("The item has been asses to cart")
      return await response.json();
    } catch(error){
      setError(error.message);
    }
  }

  return(
    <div>
      <h1>{product.name}</h1>
      <img src="" alt="" />
      <h2>{product.description}</h2>
      <h3>{product.price}</h3>
      <div>
        {successMessage && <p>{successMessage}</p>}
        {error && <p>{errorMessage}</p>}
        <button onClick={async () => await handleClick(product.id)}>Add To Cart</button>
      </div>
    </div>
  )


}
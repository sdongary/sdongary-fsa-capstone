import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../main";

export default function Cart({ token }) {
    const [carts, setCarts] = useState([]);    
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState("")  


    useEffect(() => {
        async function fetchCart() {
          try {
              const response = await fetch(`${API_URL}/api/mycart`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                }
              });
              const result = await response.json();
              setCarts(result);
              console.log("cart", result)
          } catch (error) {
              console.log(error);
          }
        }
        fetchCart();
    }, [token]);



    async function updateAddCart(productId) {
        try {
          const response = await fetch(`${API_URL}/api/mycart/${productId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                    qty: 1,
              }),
            });
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteCartProduct(productId) {
        console.log(productId)
        try {
            const response = await fetch(`${API_URL}/api/mycart/${productId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <h1>My cart</h1>
        {!token ? (<div> <h1>Login to Continue</h1></div>) : (<div><table>
        <thead className="">
            <tr>
                <th>name</th>
                <th>quantity</th>
            </tr>
        </thead>
        <tbody className="">
            {carts.map((cart) => {
                return (
              <tr key={cart.id}>
                  <td>{cart.name}</td>
                  <td>{cart.quantity}</td>          
                  <td><button onClick={async () => await updateAddCart(cart.id)}>+1</button></td>
                  
                  <td>
                      <button onClick={async () => await deleteCartProduct(cart.id)}>
                          delete </button>
                  </td>
                </tr>
                )
            })}
        </tbody>
    </table>
        <button onClick={() => navigate("/checkout")}>Check out</button>   </div>

        )}

        </>
    )
}
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../main";

export default function MyCart({ token }) {
    const [cartItems, setCartItems] = useState([]);    
    const navigate = useNavigate();
       
    const fetchCartItems = async () => {
          try {
              const response = await fetch(`${API_URL}/mycart/cartItems`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                }
              });
              const result = await response.json();
              fetchCartItems(result);
              
          } catch (error) {
              console.log(error);
          }
        }

   useEffect(() => {      
        fetchCartItems();
    }, []);

    async function updateCartQuantity(cartItemId, quantity) {
        try {
          const response = await fetch(`${API_URL}mycart/cartItems/${cartItemId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                    quantity
              }),
            });
            const result =  await response.json();
            await fetchCartItems();
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteCartItem(cartItemId) {
        try {
          const response = await fetch(`${API_URL}mycart/cartItems/${cartItemId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
              throw new Error("Items could not be deleted.");
            }
            a
           await fetchCartItems();
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteCartedProducts() {
      try {
        const response = await fetch(`${API_URL}/mycart/cartitems`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Items could not be deleted.");
        }
        await fetchCartItems();
      } catch (error) {
        console.log(error);
      }
    }

    const navigateCheckout = () => {
      navigate("/checkout");
    };
  
    return (
      <>
      <div className="cartItems">
        <h1>My Cart</h1>
        <div className="cartItems-display">
          {token ? (
          cartItems.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cartItem) => {
                  return (
                    <tr key={cartItem.id}>
                      <td>{cartItem.name}</td>
                      <td>{cartItem.quantity}</td>
                      <td>{cartItem.price}</td>
                      <button onClick={() => {updateCartQuantity(cartItem.id, +1)}}>+</button>
                      <button onClick={() => {updateCartQuantity(cartItem.id, -1)}}>-</button>
                      <button onClick={() => {deleteItem(cartItem.id)}}>Remove Item</button>
                    </tr>
                  );
                })}
              </tbody>
            <h3>Total price: ${totalPrice.sum}</h3>
            <button onClick={() => {navigateCheckout(); deleteCartedProducts()}}>Checkout</button>
            </table>
          ) : (           
            <p>Cart is empty</p>
          )
        ) : (
          <h3>
            Please log in
            <button onClick={() => navigate("/login")}>Login</button>
            or register
            <button onClick={() => navigate("/register")}>Register</button>
            to your account
          </h3>
        )}
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  </>
);
}
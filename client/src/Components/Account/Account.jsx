import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

const API_URL = 'http://localhost:3000/api';

export default function Account({ token, setToken}){
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/myaccount`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        setUserData(result);
    } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  async function deleteUser() {
    try{
      const response = await fetch('${API_URL}/auth/myaccount', {
        method: "DELETE", 
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
    } catch(error){
      console.log(error);
    }
  }

const logout = () => {
  window.localStorage.removeItem("token");
  setToken({});
};

const navigateHome = () => {
  navigate("/");
  setToken({});
};

return (
  <>
    <div className="account">
      <h1>Account</h1>
      {token ? (
        <>
          <ul className="user">
            <li key={userData.id}>
              <h3>Email: {userData.email}</h3>
              <h3>UserName: {userData.username}</h3>
              <h3>Address: {userData.address}</h3>
            </li>
          </ul>
          <button onClick={() => navigate("/myCart")}>My Cart</button>
          <button>My Orders</button>
          <button onClick={() => navigate("/UserSettings")}>User Settings</button>
          <button onClick={() => { deleteUser(); navigateHome() }}>Delete User</button>
          <button onClick={() => { logout(); navigateHome() }}>Logout</button>
        </>
        ) : (
          <h3>
            Please log in
            <button onClick={() => navigate("/login")}>Login</button>
            or register
            <button onClick={() => navigate("/register")}>Register</button>
            to your account
          </h3>
        )
        }
      </div>
    </>
  );
}
import { useEffect, useState } from "react";
import { API_URL } from "../main";
import {useNavigate} from "react-router-dom";

export function Account({ token, setToken}){
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const response = await fetch(`${API_URL}/api/users/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });
            const result = await response.json();
            setUser(result);
        } catch (error) {
            console.log(error);
        }
    };
    fetchUser();
}, [token]);

const logout = () => {
  if(!token){
    setErrorMessage("Log In to Continue!")
  } else {
  window.localStorage.removeItem("token");
  setToken({});
  setSuccessMessage("GoodBye!")
  }
};

const navigateHome = () => {
  navigate("/");
  setToken({});
};
return (
  <div className="account">
    <h1>Account</h1>
    {errorMessage && <h3>{errorMessage}</h3>}
    {successMessage && <h3>{successMessage}</h3>}
    <button onClick={() => {logout(); navigateHome()}}>Logout </button>
  </div>
)
}
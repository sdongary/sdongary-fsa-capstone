import { useState } from "react";
import { useNavigate } from "react-router-dom";


const API_URL = 'http://localhost:3000/api';

export default function Register ({ user, setUser, token, setToken })  {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const navigate = useNavigate();
  
const submit = event => {
  event.preventDefault();
  register({ email, password });
}
const register = async (credentials) => {
    
    try{
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const result = await response.json();
      if (response.ok) {
        window.localStorage.setItem("token", result.token);
      setSuccessMessage("Registration Successful! Login to your account");
      setToken(result.token)
      setUser(email)
    } else {
      setError("Registration Unsuccessful");
    }
    } catch (error){
      console.log(error);
    }
  };
  function formValidation() {
    if (password.length < 5) {
      alert("Invalid, Password must contain atleast 5 characters or more.");
      return;
    }
    if (email == password) {
      alert("Invalid, Password must not be the similar to email.");
      return;
    }
  }

  return(
    <>
    {token ? (
      <h1>Logged in as {user}</h1>
    ) : (
      <div className="login">
        <h1>Register</h1>
        {error && <p>{error}</p>}
        {successMessage && <p>{successMessage}</p>}
        <form className="form" onSubmit={submit}>
          <label htmlFor={"email"} className="email">
            Email:{" "}
            <input
              type={"email"}
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </label>
          <label htmlFor={"password"} className="password">
            Password:{" "}
            <input
              type={"password"}
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </label>
          <button
            disabled={!email || !password}
            type="submit"
            onClick={() => {
              formValidation();
            }}
          >
            Register
          </button>
        </form>
        <p>Already have an account?</p>
        <button onClick={() => navigate("/login")}>Log In</button>
      </div>
    )}
  </>
);
}
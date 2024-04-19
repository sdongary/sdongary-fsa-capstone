import { useState } from "react";
import {API_URL} from "../main";


export function Register ({ token, setToken })  {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
const submit = event => {
  event.preventDefault();
  register({ email, password });
}
const register = async (credentials) => {
    
    try{
      const response = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const result = await response.json();
      setSuccessMessage(result.message);
      setToken(result.token)
      
    } catch (error){
      setError(error.message);
    }
  };

  return(
    <>
    <h1>
        Register
    </h1>
    <div>
        {successMessage && <p>{successMessage}</p>}
        {error && <p>{error}</p>}
    </div>

    <form className="registerationForm" onSubmit={submit}>

        <label>
            Email: {""}
            <input type="email" value={email} onChange={(event) => { setEmail(event.target.value) }} />
        </label>
        <br />
        <label>
            Password: {""}
            <input type="password" value={password} onChange={(event) => { setPassword(event.target.value) }} />
        </label>
        <br />
        <button disabled={!email || !password} type="submit" onClick={submit}>Register</button>
    </form>
</>
  );
};
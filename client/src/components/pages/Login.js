import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    fetch("http://localhost:5555/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);

      if (r.ok) {
        r.json().then((user) => {
          onLogin(user); 
          
          setLoggedIn(true);
        });

      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <>
    {loggedIn && ( <Navigate to="/" />) }

    {!loggedIn && (<div className="auth">
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              required
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              required
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Login</button>

          <div>
            Don't have an account? Create one here.{" "}
            <NavLink to="/register">Register</NavLink>
          </div>
        </form>
      </div>
    </div>)
    }
    </>
  );
}

export default Login;
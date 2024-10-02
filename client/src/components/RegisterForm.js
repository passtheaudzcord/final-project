import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

function RegisterForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    
    fetch("http://localhost:5555/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => onLogin(user));
        } else {
          r.json().then((err) => setErrors(err.errors || ["An error occurred."]));
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setErrors([error.message || "An unexpected error occurred."]);
      });
  }

  return (
    <div className="register">
        <h1>Register</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        autoComplete="off"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />
      <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
      <span>Do you already have an account? Login here. <NavLink to = "/login">Login</NavLink></span>

      {/* Display errors */}
      {errors.length > 0 && (
        <ul>
          {errors.map((err, index) => (
            <li key={index} className="error">
              {err}
            </li>
          ))}
        </ul>
      )}
    </form>
    </div>
  );
}

export default RegisterForm;
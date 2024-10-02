import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate

function RegisterForm({ onLogin }) {
  const [username, setUsername] = useState("");  // State for username
  const [password, setPassword] = useState("");  // State for password
  const [errors, setErrors] = useState([]);  // State for errors
  const [isLoading, setIsLoading] = useState(false);  // State for loading spinner
  const navigate = useNavigate();  // Create navigate function from useNavigate

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);

    // Make a POST request to the backend to register the user
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
          r.json().then((user) => {
            onLogin(user);  // Handle the login after registration
            navigate("/login");  // Redirect to login page after successful registration
          });
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
        <span>
          Do you already have an account? <NavLink to="/login">Login</NavLink>
        </span>

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

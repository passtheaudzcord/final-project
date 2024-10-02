import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");  // State for username
  const [password, setPassword] = useState("");  // State for password
  const [errors, setErrors] = useState([]);  // State for errors
  const navigate = useNavigate();  // Create navigate function from useNavigate

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent form from refreshing the page

    // Ensure both username and password are filled in
    if (!username || !password) {
      setErrors(["Username and password are required"]);
      return;
    }

    // Make a POST request to the backend login API
    axios
      .post("http://localhost:5555/login", { username, password })
      .then((response) => {
        console.log("Login successful:", response.data);  // Log the successful login response
        onLogin(response.data);  // Handle the login success (e.g., store user info)
        navigate("/");  // Redirect to the home page after successful login
      })
      .catch((error) => {
        if (error.response) {
          console.log("Error from server:", error.response.data);  // Log any errors from the server
          setErrors([error.response.data.message || "Login failed"]);
        } else {
          setErrors(["An error occurred during login."]);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        value={username}  // Bind input value to state
        onChange={(e) => setUsername(e.target.value)}  // Update state on change
        autoComplete="off"
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}  // Bind input value to state
        onChange={(e) => setPassword(e.target.value)}  // Update state on change
        autoComplete="current-password"
      />

      <button type="submit">Login</button>

      {/* Display errors if there are any */}
      {errors.length > 0 && (
        <ul>
          {errors.map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default LoginForm;

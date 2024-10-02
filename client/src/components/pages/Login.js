import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

    return(
        <div className="auth">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input required type="text" placeholder='username' />
                <input required type="password" placeholder='password' />
                <button>Login</button>
                <span>
                    Don't have an account? Create one here. <NavLink to = "/register">Register</NavLink>
                </span>
            </form>
        </div>
    )

}


export default Login;
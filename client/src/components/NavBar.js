import React from "react";
import { Link } from "react-router-dom";
import Logo from "./img/logo.png";
import "./styles.scss";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("http://localhost:5555/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <div className="NavBar">
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <span>
          <h4>Endemic Oceanquest</h4>
        </span>
        <div className="links">
          <Link className="home-link" to='/'>
          <h6>Home</h6>
          </Link>
          <Link className="oceans-link" to={`/oceans`}>
            <h6>Oceans</h6>
          </Link>
          <Link className="animals-link" to="/animals">
            <h6>Animals</h6>
          </Link>
          <Link className="about-link" to="/about">
            <h6>About</h6>
          </Link>
          <Link className="favorites-link" to="/favorites">
            <h6>Favorites</h6>
          </Link>
          {user ? <button onClick={handleLogoutClick} style={{ cursor: "pointer" }}>
            Logout
          </button>: (<><Link className="login-link" to="/login">
          <h6>Login</h6>
          </Link>
          <Link className="register-link" to="/register">
          <h6>Register</h6>
          </Link></>)}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
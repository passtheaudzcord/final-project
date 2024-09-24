import React from "react";
import { Link } from "react-router-dom";


function NavBar() {
  return (
    <nav className="NavBar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
        <Link to="/oceans"> All Oceans </Link>
        </li>
        <li>
        <Link to="/animals"> All Animals </Link>
        </li>
        <li>
          <Link to="/user/new">Add User</Link>
        </li>
        <li>
          <Link to="/user/delete">Delete User</Link>
        </li>

      </ul>
    </nav>
  );
}

export default NavBar;
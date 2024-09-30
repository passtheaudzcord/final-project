import React from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search"
import SignupForm from "./pages/Register"



function NavBar() {
  return (
    <nav className="NavBar"> NavBar
    <div classname="container">
      <div classname="logo">
        <img src= "" alt=""/>
      </div>
      <div classname="links">links</div>
    </div>
      {/* <ul>
        <li>
          <NavLink to="/" activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/oceans" activeClassName="active">All Oceans</NavLink>
        </li>
        <li>
          <NavLink to="/animals" activeClassName="active">All Animals</NavLink>
        </li>
        <li>
          <NavLink to="/favorites" activeClassName="active">Favorites</NavLink>
        </li>
        <li>
          <NavLink to="/user/new" activeClassName="active">Add User</NavLink>
        </li>
        <li>
          <NavLink to="/user/delete" activeClassName="active">Delete User</NavLink>
        </li>
        <li>
          <NavLink to="/user/update" activeClassName="active">Update User</NavLink>
        </li>
      </ul> */}
    </nav>
  );
}

export default NavBar;
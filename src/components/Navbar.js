import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav">
      <NavLink
        to="/"
        className={`nav__link ${({ isActive }) =>
          isActive ? "nav__link--active" : ""}`}
      >
        Home
      </NavLink>
    </nav>
  );
};

export default Navbar;

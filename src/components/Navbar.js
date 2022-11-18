import React from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  {
    text: "Home",
    to: "/",
  },
  {
    text: "About",
    to: "/about",
  },
  {
    text: "Shop",
    to: "/shop",
  },
];

const Navbar = () => {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav__list">
          {navLinks.map((link, i) => {
            return (
              <li key={i}>
                <NavLink
                  to={link.to}
                  className={`nav__link ${({ isActive }) =>
                    isActive ? "nav__link--active" : ""}`}
                >
                  {link.text}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

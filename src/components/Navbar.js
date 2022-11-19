import React from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "../data/navLinks";
import styled from "styled-components";

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 2.4rem 0;
  background-color: #f7f7f7;
  box-shadow: 0 1.2rem 2.4rem rgba(0, 0, 0, 0.075);

  .list {
    display: flex;
    list-style: none;
    gap: 2rem;
    justify-content: center;
  }

  .link {
    text-decoration: none;
    text-transform: uppercase;
    color: #000;
  }

  .link.active {
    font-weight: 600;
  }
`;

const Navbar = () => {
  return (
    <Wrapper>
      <nav className="nav">
        <ul className="list">
          {navLinks.map((link, i) => {
            return (
              <li key={i}>
                <NavLink to={link.to} className="link">
                  {link.text}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </Wrapper>
  );
};

export default Navbar;

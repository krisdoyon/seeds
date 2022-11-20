import React from "react";
import { NavLink, Link } from "react-router-dom";
import { navLinks } from "../data/navLinks";
import styled from "styled-components";
import { BsCart3 } from "react-icons/bs";
import { useSelector } from "react-redux";

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 2.4rem 0;
  background-color: #f7f7f7;
  box-shadow: 0 1.2rem 2.4rem rgba(0, 0, 0, 0.075);

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list {
    display: flex;
    list-style: none;
    gap: 3rem;
    justify-content: center;
  }

  .link {
    text-decoration: none;
    text-transform: uppercase;
    color: #000;
    font-size: 1.6rem;
    letter-spacing: 2px;
  }

  .link.active {
    font-weight: 700;
  }

  .icon {
    height: 3.2rem;
    width: 3.2rem;
  }

  .btn-cart {
    position: relative;
    height: 3.2rem;
  }

  .cart-amount {
    height: 2rem;
    width: 2rem;
    padding: 1.2rem;
    background-color: green;
    color: #fff;
    position: absolute;
    top: -3rem;
    right: -1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1000rem;
    font-weight: 600;
  }
`;

const Navbar = () => {
  const { amount } = useSelector((state) => state.cart);
  return (
    <Wrapper>
      <nav className="nav container">
        <div className="logo">LOGO</div>
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
        <div className="icons">
          <Link to="/cart" className="btn btn-cart">
            <BsCart3 className="icon" />
            <div className="cart-amount">{amount}</div>
          </Link>
        </div>
      </nav>
    </Wrapper>
  );
};

export default Navbar;

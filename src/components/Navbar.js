import React from "react";
import { NavLink, Link } from "react-router-dom";
import { navLinks } from "../data/navLinks";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa";
import CartButton from "./CartButton/CartButton";

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 3rem 0;
  background-color: #f7f7f7;
  box-shadow: 0 1.2rem 2.4rem rgba(0, 0, 0, 0.075);

  .nav {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: var(--container-max-width);
    margin: 0 auto;
    position: relative;
  }

  .logo {
    height: 5rem;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
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

    &:hover {
      font-weight: 700;
      color: var(--color-primary-dark);
    }
  }

  .link.active {
    font-weight: 700;
    color: var(--color-primary-dark);
  }

  .btn-container {
    display: flex;
    gap: 3rem;
    align-items: center;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }

  .btn-wishlist-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .btn-wishlist-icon {
    height: 2.4rem;
    width: 2.4rem;
  }

  .wishlist-amount {
    font-size: 1.4rem;
  }
`;

const Navbar = () => {
  const { wishlistAmount } = useSelector((state) => state.wishlist);

  return (
    <Wrapper>
      <nav className="nav">
        <img src="img/logo.png" alt="logo" className="logo" />
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
        <div className="btn-container">
          <Link to="/wishlist" className="btn-wishlist-container">
            <FaRegHeart className="btn-wishlist-icon" />
            <div className="wishlist-amount">{wishlistAmount}</div>
          </Link>
          <CartButton />
        </div>
      </nav>
    </Wrapper>
  );
};

export default Navbar;

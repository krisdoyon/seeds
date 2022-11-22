import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import CartDropdown from "./CartDropdown";

const Wrapper = styled.div`
  position: relative;

  .btn-cart-icon {
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
    background-color: var(--color-primary-dark);
    color: #fff;
    position: absolute;
    top: -3rem;
    right: -1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1000rem;
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

const CartButton = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { amount } = useSelector((state) => state.cart);

  return (
    <Wrapper>
      {showDropdown && <CartDropdown setShowDropdown={setShowDropdown} />}
      <Link
        to="/cart"
        className="btn-cart btn"
        onMouseOver={() => setShowDropdown(true)}
        onMouseOut={() => setShowDropdown(false)}
      >
        <BsCart3 className="btn-cart-icon" />
        <div className="cart-amount">{amount}</div>
      </Link>
    </Wrapper>
  );
};

export default CartButton;

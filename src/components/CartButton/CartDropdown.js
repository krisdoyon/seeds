import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import CartPreviewItem from "./CartPreviewItem";
import { formatPrice } from "../../helpers/helpers";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  position: absolute;
  top: 2rem;
  right: 0rem;
  width: 45rem;
  height: max-content;
  z-index: 5;
  border-radius: var(--border-radius);
  box-shadow: 0 1.2rem 2.4rem rgba(0, 0, 0, 0.15);
  overflow: hidden;
  background-color: var(--color-white);
  overflow-y: auto;

  padding: 0 1rem;
  display: grid;

  max-height: 70vh;

  &::-webkit-scrollbar {
    width: 0.4rem;
    border-radius: 1000rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-grey-3);
    border-radius: 1000rem;
  }

  .cart-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    padding: 4rem 0;

    .btn {
      font-size: 1.4rem;
      padding: 0.6rem 1.2rem;
    }
  }

  .cart-preview-footer {
    padding: 1.8rem 0.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    bottom: 0;
    background-color: var(--color-white);
    border-top: 1px solid var(--color-grey-3);

    strong {
      margin-right: 0.8rem;
    }

    .btn {
      padding: 0.6rem 1.2rem;
      font-size: 1.4rem;
    }
  }
`;

const CartDropdown = ({ setShowDropdown }) => {
  const { cartItems, subtotal } = useSelector((state) => state.cart);

  return (
    <Wrapper
      onMouseOver={() => setShowDropdown(true)}
      onMouseOut={() => setShowDropdown(false)}
    >
      {cartItems.length === 0 && (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/shop" className="btn btn--fill">
            Continue Shopping
          </Link>
        </div>
      )}

      {cartItems.length !== 0 && (
        <>
          {cartItems.map((item) => {
            return <CartPreviewItem key={item.id} {...item} />;
          })}
          <div className="cart-preview-footer">
            <div className="cart-preview-subtotal">
              <strong>Subtotal:</strong>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <Link to="/cart" className="btn btn--fill">
              view cart
            </Link>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default CartDropdown;

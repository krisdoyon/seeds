import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  .empty-cart__message {
    font-size: 2rem;
  }
`;

const CartEmpty = () => {
  return (
    <Wrapper>
      <p className="empty-cart__message">No items in your cart</p>
      <Link to="/shop" className="btn btn--fill btn-continue">
        Continue Shopping
      </Link>
    </Wrapper>
  );
};

export default CartEmpty;

import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { formatPrice } from "../../helpers/helpers";

const Wrapper = styled.header`
  text-align: center;
  margin-bottom: 4rem;

  .heading {
    font-size: 3.6rem;
    margin-bottom: 2rem;
  }

  .shipping-message {
    font-size: 1.6rem;
  }
`;

const CartHeader = () => {
  const { subtotal, shipping, amount } = useSelector((state) => state.cart);

  const noFreeShipping = (
    <p className="shipping-message">
      Add <strong>{formatPrice(5000 - subtotal)}</strong> more to qualify for
      free shipping!
    </p>
  );
  const freeShipping = (
    <p className="shipping-message">Your order qualifies for FREE SHIPPING!</p>
  );
  return (
    <Wrapper className="cart-header">
      <h2 className="heading">YOUR CART</h2>
      {amount !== 0 && shipping === 0 && freeShipping}
      {amount !== 0 && shipping !== 0 && noFreeShipping}
    </Wrapper>
  );
};

export default CartHeader;

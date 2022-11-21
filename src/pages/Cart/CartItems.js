import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../features/cartSlice";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

const Wrapper = styled.div`
  .items {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    border-top: 1px solid var(--color-grey-3);
    border-bottom: 1px solid var(--color-grey-3);
    padding: 2rem;
    margin-bottom: 2.4rem;
  }

  .items-header {
    text-align: center;
    padding: 2rem;
    gap: 1rem;
    font-weight: 600;
  }

  .items-header,
  .cart-item {
    display: grid;
    grid-template-columns: 2.5fr 1fr 0.75fr 1fr 3rem;
    font-size: 1.6rem;
  }

  .buttons-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3.2rem;
  }
`;

const CartItems = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <header className="items-header">
        <p>Item</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Subtotal</p>
        <p></p>
      </header>
      <div className="items">
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <div className="buttons-wrapper">
        <Link to="/shop" className="btn btn--fill">
          continue shopping
        </Link>
        <button className="btn btn--fill" onClick={() => dispatch(clearCart())}>
          clear cart
        </button>
      </div>
    </Wrapper>
  );
};

export default CartItems;

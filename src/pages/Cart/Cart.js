import React, { useState } from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import Breadcrumb from "../../components/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "../../helpers/helpers";
import { Link } from "react-router-dom";
import { promoCodes } from "../../data/promo";
import { addPromo, removePromo } from "../../features/cartSlice";
import { FaTag } from "react-icons/fa";

const Wrapper = styled.div`
  margin-top: 6rem;
  max-width: 100rem;

  .cart-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .heading {
    font-size: 3.6rem;
    margin-bottom: 2rem;
  }

  .shipping-message {
    font-size: 1.6rem;
  }

  .items {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    border-top: 1px solid var(--color-grey-3);
    border-bottom: 1px solid var(--color-grey-3);
    padding: 2rem;
    margin-bottom: 4rem;
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

  /* .cart {
    display: flex;
    flex-direction: column;
  } */

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2rem;

    & > * {
      width: 30rem;
    }
  }

  .promo {
    display: grid;
    grid-template-columns: 1fr max-content;
    /* padding: 2rem 0; */
  }

  .promo-heading {
    text-transform: uppercase;
    font-size: 1.6rem;
    font-weight: 400;
    margin-bottom: 0.4rem;
  }

  input {
    border-radius: 0rem;
    border: 1px solid var(--color-grey-3);
    text-transform: uppercase;
    font-size: 1.6rem;
    color: var(--color-grey-4);

    &:focus {
      outline: none;
    }
  }

  .btn-apply {
    padding: 0.8rem 1.6rem;
  }

  .summary {
    height: max-content;
    padding: 2rem;
    align-self: flex-end;
    border: 1px solid var(--color-grey-3);
    border-radius: var(--border-radius);
  }

  .summary-title {
    margin-bottom: 1.2rem;
    font-size: 1.8rem;
    text-align: center;
  }

  .summary-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    font-size: 1.6rem;
    row-gap: 1.4rem;
  }

  .summary-amount {
    grid-column: 1/-1;
    text-align: center;
  }

  .summary-value {
    justify-self: flex-end;
  }

  .promo-label {
    color: red;
  }

  .promo {
    height: 3.6rem;
    border-radius: var(--border-radius);

    span {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }
  }

  .promo-applied {
    border: 1px solid #cea;
    padding: 0 1rem;
  }

  .btn-remove {
  }

  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    &__message {
      font-size: 2rem;
    }
  }

  .btn-continue {
    text-transform: uppercase;
    font-size: 1.4rem;
    padding: 1rem 2rem;
    font-weight: 600;
  }
`;

const Cart = () => {
  const { cartItems, subtotal, tax, shipping, total, amount, promo } =
    useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const [promoInput, setPromoInput] = useState("");

  const handlePromo = (e) => {
    const promoMatch = promoCodes.find((item) => item.code === promoInput);
    setPromoInput("");

    if (promoMatch) {
      dispatch(addPromo({ ...promoMatch }));
    }
  };

  return (
    <Wrapper className="container">
      <Breadcrumb title="Cart" />
      <header className="cart-header">
        <h2 className="heading">YOUR CART</h2>
        {!amount === 0 && (
          <p className="shipping-message">
            {shipping === 0
              ? "Your order qualifies for FREE SHIPPING!"
              : `Add ${formatPrice(
                  5000 - subtotal
                )} more to qualify for free shipping!`}
          </p>
        )}
      </header>

      {amount === 0 && (
        <div className="empty-cart">
          <p className="empty-cart__message">No items in your cart</p>
          <Link to="/shop" className="btn btn--fill btn-continue">
            Continue Shopping
          </Link>
        </div>
      )}

      {amount > 0 && (
        <div className="cart">
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
          <div className="wrapper">
            <div className="promo-wrapper">
              <h3 className="promo-heading">Promo code</h3>
              {promo.code !== null && (
                <div className="promo promo-applied">
                  <span>
                    <FaTag />
                    {`${promo.code} (${promo.percent * 100}% off)`}
                  </span>
                  <button
                    className="btn btn-remove"
                    onClick={() => dispatch(removePromo())}
                  >
                    Remove
                  </button>
                </div>
              )}
              {promo.code === null && (
                <div className="promo">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) =>
                      setPromoInput(e.target.value.toUpperCase())
                    }
                  />
                  <button
                    className="btn btn--fill btn-apply"
                    onClick={handlePromo}
                  >
                    apply
                  </button>
                </div>
              )}
            </div>
            <div className="summary">
              <h3 className="summary-title">ORDER SUMMARY:</h3>
              <div className="summary-grid">
                <p className="summary-amount">{`${amount} ${
                  amount === 1 ? "item" : "items"
                }`}</p>
                <p className="summary-label">Subtotal:</p>
                <p className="summary-value">{formatPrice(subtotal)}</p>
                {promo.amount > 0 && (
                  <>
                    <p className="summary-label promo-label">Promo:</p>
                    <p className="summary-value promo-label">
                      - {formatPrice(promo.amount)}
                    </p>
                  </>
                )}
                <p className="summary-label">Tax:</p>
                <p className="summary-value">{formatPrice(tax)}</p>
                <p className="summary-label">Shipping:</p>
                <p className="summary-value">
                  {shipping === 0 ? "FREE!" : formatPrice(shipping)}
                </p>
                <p className="summary-label">
                  <strong>Total:</strong>
                </p>
                <p className="summary-value">
                  <strong>{formatPrice(total)}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Cart;

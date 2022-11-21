import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { formatPrice } from "../../helpers/helpers";

const Wrapper = styled.div`
  height: max-content;
  padding: 2rem;
  align-self: flex-end;
  border: 1px solid var(--color-grey-3);
  border-radius: var(--border-radius);

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
    color: var(--color-red-dark);
  }
`;

const CartSummary = () => {
  const { subtotal, tax, shipping, total, amount, promo } = useSelector(
    (state) => state.cart
  );

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default CartSummary;

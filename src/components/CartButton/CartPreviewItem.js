import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { OnSale } from "../../components/Tags";
import { formatPrice } from "../../helpers/helpers";
import { removeItem, toggleAmount } from "../../features/cartSlice";

import QuantityBtns from "../QuantityBtns";

const Wrapper = styled.article`
  display: grid;
  grid-template-columns: 8rem 1fr;
  grid-template-rows: max-content 1fr;
  background-color: var(--color-white);
  padding: 1rem 0;
  column-gap: 1rem;
  row-gap: 1rem;
  font-size: 1.4rem;
  border-bottom: 1px solid var(--color-grey-3);

  :last-of-type {
    border-bottom: none;
  }

  .cart-preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tag {
      font-size: 1.1rem;
      padding: 0.3rem 0.6rem;
    }
  }

  .cart-preview-title {
    font-weight: 600;
    font-size: 1.6rem;
  }

  img {
    width: 100%;
    object-fit: contain;
    grid-row: 1/-1;
  }

  .cart-preview-content {
    display: grid;
    grid-template-columns: 1fr max-content;
    justify-content: space-around;

    .btn-remove {
      transition: none;
    }

    .btn {
      align-self: flex-start;
      color: var(--color-black);

      &:hover {
        font-weight: 700;
      }
    }
  }

  .cart-preview-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    justify-content: space-around;
  }

  .qty-btns {
    grid-column: 2;
    grid-row: 1/-1;
    width: 15rem;
    align-self: end;
    margin-bottom: 0;
  }
`;

const CartPreviewItem = ({
  id,
  title,
  category,
  quantity,
  price,
  salePrice,
  inStock,
}) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(toggleAmount({ action: "increase", id }));
  };

  const handleDecrease = () => {
    dispatch(toggleAmount({ action: "decrease", id }));
  };

  return (
    <Wrapper>
      <img src={`/img/${id}.webp`} alt={title} />
      <header className="cart-preview-header">
        <h3 className="cart-preview-title">{title}</h3>
        {salePrice && <OnSale />}
      </header>

      <div className="cart-preview-content">
        <div className="cart-preview-info">
          <p>{formatPrice(salePrice || price)} / ea.</p>
          <button
            className="btn btn-remove"
            onClick={() => dispatch(removeItem(id))}
          >
            Remove
          </button>
        </div>
        <QuantityBtns
          quantity={quantity}
          inStock={inStock}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
        />
      </div>
    </Wrapper>
  );
};

export default CartPreviewItem;

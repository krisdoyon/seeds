import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { removeItem, toggleAmount } from "../../features/cartSlice";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { formatPrice } from "../../helpers/helpers";
import { Link } from "react-router-dom";
import { OnSale } from "../../components/Tags";

const Wrapper = styled.article`
  column-gap: 1rem;
  align-items: center;
  justify-content: center;

  .title-wrapper {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .title-info-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 0.6rem;
  }

  .tag {
    font-size: 1.1rem;
  }

  .in-stock {
    font-size: 1.3rem;
  }

  .low-stock {
    color: var(--color-red-dark);
  }

  img {
    height: 9rem;
  }

  .title {
    font-size: 1.6rem;
    font-weight: 600;
  }

  .price,
  .subtotal {
    text-align: center;
  }

  .price-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
  }

  .btn-remove {
    text-transform: uppercase;
    padding: 0.4rem 0.8rem;
    justify-self: center;
    font-weight: 700;
    border-radius: 0.4rem;
  }

  .toggle-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .quantity {
    font-size: 1.8rem;
    padding: 0.4rem 0;
  }

  .btn-toggle {
    height: 2rem;
    width: 2rem;
    padding: 0;
    color: var(--color-primary-dark);
  }

  .toggle-icon {
    width: 100%;
    height: 100%;
  }
`;

const CartItem = ({
  id,
  title,
  quantity,
  salePrice,
  price,
  inStock,
  category,
}) => {
  const dispatch = useDispatch();
  return (
    <Wrapper className="cart-item">
      <div className="title-wrapper">
        <img src={`img/${id}.webp`} alt="" />
        <div className="title-info-wrapper">
          <Link to={`/shop/${category}/${id}`} className="title">
            {title}
          </Link>
          {inStock > 5 && <p className="in-stock">{`${inStock} available`}</p>}
          {inStock <= 5 && (
            <p className="in-stock low-stock">{`Only ${inStock} left!`}</p>
          )}
        </div>
      </div>
      <div className="price-wrapper">
        <p className="price">{`${formatPrice(price)} each`}</p>
        {salePrice && <OnSale />}
      </div>
      <div className="toggle-wrapper">
        <button
          className="btn btn-toggle"
          onClick={() => dispatch(toggleAmount({ action: "increase", id }))}
        >
          <FaChevronUp className="toggle-icon" />
        </button>
        <p className="quantity">{quantity}</p>
        <button
          className="btn btn-toggle"
          onClick={() => dispatch(toggleAmount({ action: "decrease", id }))}
        >
          <FaChevronDown className="toggle-icon" />
        </button>
      </div>

      <p className="subtotal">{formatPrice(price * quantity)}</p>

      <button
        className="btn btn-remove btn--fill"
        onClick={() => dispatch(removeItem(id))}
      >
        X
      </button>
    </Wrapper>
  );
};

export default CartItem;

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import Breadcrumb from "../../components/Breadcrumb";
import styled from "styled-components";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItem } from "../../features/cartSlice";
import { formatPrice } from "../../helpers/helpers";
import { OnSale } from "../../components/Tags";

const Wrapper = styled.div`
  margin-top: 2rem;

  .btn-back {
    display: inline-block;
    font-size: 1.4rem;
    color: var(--color-white);
    background-color: var(--color-black);
    font-weight: 500;
    padding: 1rem 2rem;
    margin-bottom: 2rem;
  }

  .grid {
    display: grid;
    grid-template-columns: max-content 1fr;
    column-gap: 6rem;
  }

  img {
    height: 50rem;
  }

  .title {
    font-size: 4.4rem;
    margin-bottom: 2rem;
  }

  .description {
    font-size: 1.6rem;
    margin-bottom: 3rem;
  }

  .info {
    display: flex;
    flex-direction: column;
  }

  .prices-wrapper {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .strike {
    text-decoration: line-through;
    color: #555;
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin-bottom: 3rem;
  }

  .btn-wrapper {
    display: flex;
    height: 4rem;
    align-items: stretch;
    align-self: flex-start;
    background-color: #555;
    gap: 2px;
    padding: 2px;
    margin-bottom: 2rem;
    border-radius: 1rem;

    & > * {
      background-color: #fff;
      border-radius: 0;
    }
  }

  .btn-increase,
  .btn-decrease {
    border: none;
    padding: 0 1.2rem;
  }

  .btn-decrease {
    border-radius: 0.8rem 0 0 0.8rem;
  }

  .btn-increase {
    border-radius: 0 0.8rem 0.8rem 0;
  }

  .quantity {
    font-size: 2rem;
    width: 15rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn-add {
    font-size: 1.6rem;
    width: 20rem;
    text-transform: uppercase;
    align-self: flex-start;
    padding: 1rem 2rem;
    font-weight: 600;
  }
  .disabled {
    background-color: #555;
    pointer-events: none;
  }
`;

const SingleProduct = () => {
  const { id } = useParams();
  const { getProduct } = useGlobalContext();
  const {
    title,
    category,
    description,
    price,
    salePrice,
    inStock,
    reviews: { avg, num },
    details: { daysToMaturity, seedCount },
  } = getProduct(id);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(inStock === 0 ? 0 : 1);
  const [justAdded, setJustAdded] = useState(false);
  const dispatch = useDispatch();

  const handleIncrease = () => {
    if (quantity < inStock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAdd = () => {
    const item = {
      id,
      title,
      quantity,
      price: salePrice || price,
      salePrice,
      inStock,
      category,
    };
    dispatch(addItem(item));
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <Wrapper className="container">
      <header>
        <button className="btn btn-back" onClick={() => navigate(-1)}>
          Back
        </button>
        <Breadcrumb title={title} category={category} product />
      </header>
      <div className="grid">
        <img src={`/img/${id}.webp`} alt="" />
        <div className="info">
          <h2 className="title">{title}</h2>
          <p className="description">{description}</p>
          <div className="details">
            <div className="prices-wrapper">
              <strong>Price:</strong>
              <p className={`${salePrice ? "strike" : ""}`}>
                {formatPrice(price)}
              </p>
              {salePrice && <p>{formatPrice(salePrice)}</p>}
              {salePrice && <OnSale />}
            </div>
            <p>
              <strong>Rating: </strong>
              {avg} ({num} reviews)
            </p>
            <p>
              <strong>Days to Maturity: </strong>
              {daysToMaturity}
            </p>
            <p>
              <strong>Seed Count: </strong>
              {seedCount}
            </p>
            <p>
              <strong>Availability: </strong>
              {inStock ? `${inStock} in stock` : "Sold Out"}
            </p>
          </div>
          <div className="btn-wrapper">
            <button className="btn btn-decrease" onClick={handleDecrease}>
              <FaMinus />
            </button>
            <div className="quantity">{quantity}</div>
            <button className="btn btn-increase" onClick={handleIncrease}>
              <FaPlus />
            </button>
          </div>
          <button
            className={`btn btn-add btn--fill ${
              inStock === 0 || justAdded ? "disabled" : ""
            }`}
            onClick={handleAdd}
          >
            {inStock === 0 ? "Sold Out" : justAdded ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default SingleProduct;

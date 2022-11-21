import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import styled from "styled-components";
import { addItem } from "../../features/cartSlice";
import { formatPrice } from "../../helpers/helpers";
import { OnSale } from "../../components/Tags";
import { useDispatch, useSelector } from "react-redux";
import { loadSingleProduct } from "../../features/productsSlice";
import { NewTag } from "../../components/Tags";
import AddButton from "./AddButton";
import QuantityBtns from "./QuantityBtns";

const Wrapper = styled.div`
  margin-top: 4rem;

  .btn-back {
    margin-bottom: 3rem;
  }

  .grid {
    display: grid;
    grid-template-columns: max-content 1fr;
    column-gap: 6rem;
    margin-top: 3rem;
  }

  .img-container {
    height: 45rem;
    position: relative;
  }

  img {
    height: 100%;
  }

  .tag--new {
    height: 7.5rem;
    width: 7.5rem;
    font-size: 1.6rem;
    top: 1.2rem;
    left: 1.2rem;
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

  .low-stock {
    color: var(--color-red-dark);
  }

  .disabled {
    background-color: #555;
    pointer-events: none;
  }
`;

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    dispatch(loadSingleProduct(id));
  }, []);

  const { currentProduct } = useSelector((state) => state.products);

  if (currentProduct.id) {
    const {
      title,
      category,
      description,
      price,
      salePrice,
      inStock,
      reviews: { avg, num },
      details: { daysToMaturity, seedCount, isNew },
    } = currentProduct;

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
          <button
            className="btn btn--fill btn-back"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <Breadcrumb title={title} category={category} product />
        </header>
        <div className="grid">
          <div className="img-container">
            <img src={`/img/${id}.webp`} alt="" />
            {isNew && <NewTag />}
          </div>
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
                {inStock === 0 && "Sold Out"}
                {inStock > 5 && `${inStock} in stock`}
                {inStock <= 5 && inStock > 1 && (
                  <span className="low-stock">{`Only ${inStock} left in stock!`}</span>
                )}
              </p>
            </div>
            {inStock !== 0 && (
              <QuantityBtns
                quantity={quantity}
                handleDecrease={handleDecrease}
                handleIncrease={handleIncrease}
              />
            )}
            <AddButton
              inStock={inStock}
              justAdded={justAdded}
              handleAdd={handleAdd}
            />
          </div>
        </div>
      </Wrapper>
    );
  }
};

export default SingleProduct;

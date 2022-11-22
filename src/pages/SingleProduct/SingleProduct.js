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
import QuantityBtns from "../../components/QuantityBtns";
import PageNotFound from "../PageNotFound";
import { addWishlist, removeWishlist } from "../../features/wishlistSlice";
import WishlistButton from "./WishlistButton";

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

  .button-container {
    display: flex;
    gap: 1.2rem;
  }
`;

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [cartDisabled, setCartDisabled] = useState(false);
  const [wishlistDisabled, setWishlistDisabled] = useState(false);

  useEffect(() => {
    dispatch(loadSingleProduct(id));
  }, [dispatch, id]);

  const { currentProduct, error } = useSelector((state) => state.products);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  if (error) {
    return <PageNotFound />;
  }

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
      setCartDisabled(true);
      setTimeout(() => setCartDisabled(false), 2000);
    };

    const onWishlist = wishlistItems.find((item) => item.id === id);

    const handleWishlist = () => {
      setWishlistDisabled(true);
      setTimeout(() => setWishlistDisabled(false), 2000);
      if (onWishlist) {
        dispatch(removeWishlist(id));
      } else {
        dispatch(addWishlist(id));
      }
    };

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
                handleIncrease={handleIncrease}
                handleDecrease={handleDecrease}
              />
            )}
            <div className="button-container">
              <AddButton
                inStock={inStock}
                disabled={cartDisabled}
                handleAdd={handleAdd}
              />
              <WishlistButton
                onWishlist={onWishlist}
                disabled={wishlistDisabled}
                handleWishlist={handleWishlist}
              />
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
};

export default SingleProduct;

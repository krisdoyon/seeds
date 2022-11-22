import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { formatPrice } from "../../helpers/helpers";
import { OnSale, LowStock, SoldOut, NewTag } from "../../components/Tags";
import { HiMagnifyingGlass } from "react-icons/hi2";

const Wrapper = styled.article`
  background-color: var(--color-grey-2);
  height: max-content;
  width: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1rem;
  border-radius: var(--border-radius);
  height: 100%;
  transition: all 0.3s;

  &:hover {
    img {
      filter: brightness(70%);
    }
    .magnify-icon {
      opacity: 1;
    }
  }

  .product-title {
    font-size: 2rem;
    font-weight: 600;
  }

  .prices {
    display: flex;
    gap: 1.2rem;
    align-items: center;
  }

  .strike {
    text-decoration: line-through;
    color: #555;
  }

  .tags {
    position: absolute;
    top: 1rem;
    right: 0rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    z-index: 2;

    & > * {
      align-self: flex-end;
    }
  }

  .img-container {
    position: relative;
    align-self: center;
    aspect-ratio: 1/1;
  }

  img {
    height: 100%;
    width: 100%;
    transition: all 0.3s;
    object-fit: cover;
  }

  .magnify-icon {
    color: var(--color-white);
    background-color: rgba(0, 0, 0, 0.6);
    height: 3.6rem;
    width: 3.6rem;
    padding: 0.6rem;
    border-radius: 1000rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: all 0.3s;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin: auto 0;
    padding: 1rem 0;
  }
`;

const ProductCard = ({
  id,
  title,
  category,
  price,
  salePrice,
  inStock,
  reviews: { num, avg },
  details: { isNew },
}) => {
  return (
    <Wrapper>
      <Link to={`/shop/${category}/${id}`}>
        <div className="img-container">
          <img src={`/img/${id}.webp`} alt="" />
          {isNew && <NewTag />}
          <div className="tags">
            {inStock === 0 && <SoldOut />}
            {inStock <= 5 && inStock >= 1 && <LowStock />}
          </div>
          <HiMagnifyingGlass className="magnify-icon" />
        </div>
        <div className="info">
          <h2 className="product-title">{title}</h2>
          <div className="prices">
            <p className={`${salePrice ? "strike" : ""}`}>
              {formatPrice(price)}
            </p>
            {salePrice && <p>{formatPrice(salePrice)}</p>}
            {salePrice && <OnSale />}
          </div>
          <p>
            {avg} stars ({num} reviews)
          </p>
        </div>
      </Link>
    </Wrapper>
  );
};

export default ProductCard;

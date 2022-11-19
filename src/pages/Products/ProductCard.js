import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.article`
  background-color: #ccc;
  height: max-content;
  width: auto;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  position: relative;

  .prices {
    display: flex;
    gap: 1rem;
    font-size: 1.4rem;
  }

  .strike {
    text-decoration: line-through;
    color: #555;
  }

  .tags {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    z-index: 2;

    & > * {
      align-self: flex-end;
      padding: 0.4rem 0.8rem;
    }
  }

  .on-sale {
    background-color: greenyellow;
  }

  .low-stock {
    background-color: orange;
  }

  .no-stock {
    background-color: red;
  }

  .img-container {
    height: 20rem;
    width: 20rem;
    position: relative;
    align-self: center;
    margin-bottom: 2rem;
  }

  img {
    height: 100%;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
`;

const ProductCard = ({ id, title, category, price, salePrice, inStock }) => {
  return (
    <Wrapper>
      <div className="tags">
        {inStock === 0 && <div className="no-stock">OUT OF STOCK</div>}
        {inStock <= 5 && inStock >= 1 && (
          <div className="low-stock">LOW STOCK</div>
        )}
        {salePrice && <div className="on-sale">ON SALE</div>}
      </div>
      <div className="img-container">
        <img src={`/img/${id}.webp`} alt="" />
      </div>
      <div className="info">
        <h2>{title}</h2>
        <div className="prices">
          <p className={`${salePrice ? "strike" : ""}`}>${price}</p>
          {salePrice && <p>${salePrice}</p>}
        </div>
        <Link to={`/shop/${category}/${id}`}>MORE INFO</Link>
      </div>
    </Wrapper>
  );
};

export default ProductCard;

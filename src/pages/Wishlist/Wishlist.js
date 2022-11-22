import React from "react";
import styled from "styled-components";
import Breadcrumb from "../../components/Breadcrumb";
import ProductCard from "../../pages/Shop/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { removeWishlist } from "../../features/wishlistSlice";

const Wrapper = styled.div`
  .wishlist-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .wishlist-heading {
    margin-top: 4rem;
    font-size: 3.6rem;
    margin-bottom: 4rem;
  }

  .wishlist-empty {
  }

  .wishlist-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    max-width: 100rem;
  }

  .wishlist-item {
    display: flex;
    flex-direction: column;

    .btn {
      border-radius: 0 0 var(--border-radius) var(--border-radius);
    }
  }
`;

const Wishlist = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <Wrapper className="container">
      <Breadcrumb title="wishlist" />
      <div className="wishlist-container">
        <h2 className="wishlist-heading">Wishlist</h2>
        {wishlistItems.length === 0 && (
          <p className="wishlist-empty">Your wishlist is empty.</p>
        )}
        {wishlistItems.length !== 0 && (
          <div className="wishlist-grid">
            {wishlistItems.map((item) => {
              return (
                <article className="wishlist-item">
                  <ProductCard key={item.id} {...item} />
                  <button
                    className="btn btn--fill"
                    onClick={() => dispatch(removeWishlist(item.id))}
                  >
                    Remove
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Wishlist;

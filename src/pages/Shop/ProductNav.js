import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, updateFilters } from "../../features/productsSlice";

const Wrapper = styled.nav`
  .product-nav__heading {
    font-size: 2.2rem;
    margin-bottom: 2rem;
  }

  .link {
    text-decoration: none;
    text-transform: capitalize;
    color: #333;
    font-size: 1.6rem;

    &:hover {
      font-weight: 600;
      color: var(--color-primary-dark);
    }
  }

  .link.active {
    font-weight: 600;
    color: var(--color-primary-dark);
  }

  .sticky {
    position: sticky;
    top: 11rem;
    max-height: 80vh;
    overflow-y: auto;
  }

  .filter-row {
    display: flex;
    gap: 0.8rem;
  }

  .link-list {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin-bottom: 3rem;
  }

  .btn-clear {
    align-self: flex-start;
    font-size: 1.2rem;
    padding: 0.6rem 1.2rem;
  }
`;

const ProductNav = () => {
  const { allCategories, filters } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div className="sticky">
        <h2 className="product-nav__heading">Shop by Category</h2>
        <div className="link-list">
          <NavLink to="/shop" className="link" end>
            All
          </NavLink>
          {allCategories.map((category, i) => {
            return (
              <div key={i}>
                <NavLink to={`/shop/${category}`} className="link">
                  {category}
                </NavLink>
                <br />
              </div>
            );
          })}
        </div>
        <h2 className="product-nav__heading">Filter</h2>
        <div className="link-list">
          <div className="filter-row">
            <input
              id="new"
              name="new"
              type="checkbox"
              checked={filters.new}
              onChange={(e) =>
                dispatch(
                  updateFilters({
                    filter: e.target.name,
                    value: e.target.checked,
                  })
                )
              }
            />
            <label htmlFor="new">New</label>
          </div>
          <div className="filter-row">
            <input
              id="onSale"
              name="onSale"
              type="checkbox"
              checked={filters.onSale}
              onChange={(e) =>
                dispatch(
                  updateFilters({
                    filter: e.target.name,
                    value: e.target.checked,
                  })
                )
              }
            />
            <label htmlFor="onSale">On sale</label>
          </div>
          <button
            className="btn btn--fill btn-clear"
            onClick={() => dispatch(clearFilters())}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductNav;

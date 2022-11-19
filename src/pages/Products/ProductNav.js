import React from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import styled from "styled-components";

const Wrapper = styled.nav`
  background-color: #ccc;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 2rem;

  .link {
    text-decoration: none;
    text-transform: capitalize;
    color: #333;
    font-size: 1.6rem;
  }

  .link.active {
    font-weight: 600;
  }
`;

const ProductNav = () => {
  const { allCategories } = useGlobalContext();
  return (
    <Wrapper>
      <h2>Shop by Category</h2>
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
    </Wrapper>
  );
};

export default ProductNav;

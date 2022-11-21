import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  text-transform: capitalize;
  font-size: 1.4rem;
  a {
    text-decoration: none;
    color: inherit;
    font-family: inherit;

    &:hover {
      font-weight: 600;
    }
  }

  .breadcrumb__title {
    font-weight: 600;
  }
`;

const Breadcrumb = ({ title, category, product }) => {
  return (
    <Wrapper>
      <Link to="/">Home</Link>
      <span> / </span>
      {(category || product) && (
        <>
          <Link to="/shop">Shop</Link>
          <span> / </span>
        </>
      )}
      {product && (
        <>
          <Link to={`/shop/${category}`}>{category}</Link>
          <span> / </span>
        </>
      )}
      <span className="breadcrumb__title"> {title}</span>
    </Wrapper>
  );
};

export default Breadcrumb;

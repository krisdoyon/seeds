import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  text-transform: capitalize;
  margin-bottom: 2rem;
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
      <Link to="/">Home</Link> /
      {(category || product) && <Link to="/shop"> Shop /</Link>}
      {product && <Link to={`/shop/${category}`}> {category} /</Link>}
      <span className="breadcrumb__title"> {title}</span>
    </Wrapper>
  );
};

export default Breadcrumb;

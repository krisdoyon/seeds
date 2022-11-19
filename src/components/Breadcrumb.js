import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  text-transform: capitalize;
  margin-bottom: 2rem;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Breadcrumb = ({ title, category, product }) => {
  return (
    <Wrapper>
      <span>
        <Link to="/">Home</Link> /
        {(category || product) && <Link to="/shop"> Shop /</Link>}
        {product && <Link to={`/shop/${category}`}> {category} /</Link>} {title}
      </span>
    </Wrapper>
  );
};

export default Breadcrumb;

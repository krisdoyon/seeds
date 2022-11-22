import React from "react";
import styled from "styled-components";

import PopularCard from "./PopularCard";
import { popularProducts } from "../../data/popular";

const Wrapper = styled.section`
  .popular-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }

  .popular-heading-primary {
    text-transform: uppercase;
    color: var(--color-primary-dark);
    margin-bottom: 0.4rem;
  }

  .popular-heading-secondary {
    color: var(--color-grey-4);
    font-weight: 500;
    margin-bottom: 3rem;
  }
`;

const Popular = () => {
  return (
    <Wrapper>
      <h3 className="popular-heading-primary">Shop</h3>
      <h2 className="popular-heading-secondary">Popular Categories</h2>
      <div className="popular-grid">
        {popularProducts.map((item, i) => {
          return <PopularCard key={i} {...item} />;
        })}
      </div>
    </Wrapper>
  );
};

export default Popular;

import React from "react";
import styled from "styled-components";
import { MdLocalShipping } from "react-icons/md";
import { FaAward } from "react-icons/fa";

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  max-width: 120rem;
  margin: 0 auto;
  gap: 6rem;

  .feature {
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-template-rows: max-content 1fr;
    max-width: 30rem;
    align-items: center;
    column-gap: 1rem;
    row-gap: 1.8rem;
  }

  .feature-icon {
    height: 4rem;
    width: 4rem;
    grid-column: 1;
    grid-row: 1;
    align-self: center;
    color: var(--color-primary-dark);
  }

  .feature-title {
    grid-column: 2;
  }

  .feature-text {
    grid-column: span 2;
    font-size: 1.8rem;
    align-self: start;
  }
`;

const Features = () => {
  return (
    <Wrapper>
      <article className="feature">
        <FaAward className="feature-icon" />
        <h3 className="feature-title">Satisfaction Guarantee</h3>
        <p className="feature-text">
          Or your money back. We guarantee germination for all seeds!
        </p>
      </article>
      <article className="feature">
        <MdLocalShipping className="feature-icon" />
        <h3 className="feature-title">Free Shipping</h3>
        <p className="feature-text">
          On all orders over $50. Same day shipping on all orders!
        </p>
      </article>
      <article className="feature">
        <MdLocalShipping className="feature-icon" />
        <h3 className="feature-title">Free Shipping</h3>
        <p className="feature-text">
          On all orders over $50. Same day shipping on all orders!
        </p>
      </article>
    </Wrapper>
  );
};

export default Features;

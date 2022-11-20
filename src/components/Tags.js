import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0.4rem 0.8rem;
  text-transform: uppercase;
  font-size: 1.2rem;
`;

export const OnSale = () => {
  return <Wrapper className="tag on-sale">on sale</Wrapper>;
};

export const LowStock = () => {
  return <Wrapper className="tag low-stock">low stock</Wrapper>;
};

export const SoldOut = () => {
  return <Wrapper className="tag sold-out">sold out</Wrapper>;
};

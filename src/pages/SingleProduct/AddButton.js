import React from "react";
import styled from "styled-components";

const Wrapper = styled.button`
  width: 18rem;
  text-transform: uppercase;
  align-self: flex-start;
  padding: 1rem 2rem;
  font-weight: 600;
`;

const AddButton = ({ inStock, justAdded, handleAdd }) => {
  return (
    <Wrapper
      className={`btn btn--fill ${
        inStock === 0 || justAdded ? "disabled" : ""
      }`}
      onClick={handleAdd}
    >
      {inStock === 0 ? "Sold Out" : justAdded ? "Added!" : "Add to Cart"}
    </Wrapper>
  );
};

export default AddButton;

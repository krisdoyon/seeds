import React from "react";
import styled from "styled-components";

const Wrapper = styled.button`
  width: 18rem;
`;

const AddButton = ({ inStock, disabled, handleAdd }) => {
  return (
    <Wrapper
      className={`btn btn--fill ${inStock === 0 || disabled ? "disabled" : ""}`}
      onClick={handleAdd}
    >
      {inStock === 0 ? "Sold Out" : disabled ? "Added!" : "Add to Cart"}
    </Wrapper>
  );
};

export default AddButton;

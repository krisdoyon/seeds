import React from "react";
import styled from "styled-components";

const Wrapper = styled.button`
  width: 23rem;
`;

const WishlistButton = ({ disabled, handleWishlist, onWishlist }) => {
  let buttonText;
  if (onWishlist && !disabled) {
    buttonText = "Remove from Wishlist";
  } else if (!onWishlist && disabled) {
    buttonText = "Removed!";
  } else if (onWishlist && disabled) {
    buttonText = "Added!";
  } else {
    buttonText = "Add to Wishlist";
  }

  return (
    <Wrapper
      className={`btn btn--fill ${disabled ? "disabled" : ""}`}
      onClick={handleWishlist}
    >
      {buttonText}
    </Wrapper>
  );
};

export default WishlistButton;

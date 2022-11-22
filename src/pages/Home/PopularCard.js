import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

const Wrapper = styled.article`
  position: relative;
  aspect-ratio: 1/1;

  &:hover {
    img {
      filter: brightness(100%);
    }
  }

  img {
    width: 100%;
    transition: all 0.3s;
    filter: brightness(70%);
    object-fit: cover;
  }

  h3 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--color-white);
    text-transform: uppercase;
  }
`;

const PopularCard = ({ title, img, link }) => {
  return (
    <Wrapper>
      <Link to={link}>
        <img src={img} alt={title} />
        <h3>{title}</h3>
      </Link>
    </Wrapper>
  );
};

export default PopularCard;

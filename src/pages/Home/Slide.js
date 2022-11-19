import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.article`
  background-color: red;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgb(255, 148, 148);
  opacity: 0;
  transition: transform 0.3s, opacity 0.3s;
  background-size: cover;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 2rem;

  .content {
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    width: 45rem;
    padding: 2rem;
  }

  .title {
    font-size: 3.6rem;
  }

  .text {
    font-size: 1.6rem;
  }

  .btn-shop {
    align-self: flex-start;
    text-transform: uppercase;
    transition: all 0.3s;
    font-size: 1.4rem;

    &:hover {
      background-color: #f7f7f7;
    }
  }
`;

const Slide = ({ title, text, to, image, slideClass, position }) => {
  console.log(image);
  return (
    <Wrapper
      className={slideClass}
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: position,
      }}
    >
      <div className="content">
        <h2 className="title">{title}</h2>
        <p className="text">{text}</p>
        <Link to={to} className="btn btn-shop">
          Shop
        </Link>
      </div>
    </Wrapper>
  );
};

export default Slide;

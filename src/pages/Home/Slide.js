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
  transition: all 0.5s linear;
  background-size: cover;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: var(--border-radius);

  .content {
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    width: 45rem;
    padding: 3rem 2rem;
    border-radius: var(--border-radius) 0 0 var(--border-radius);
  }

  .title {
    font-size: 3.6rem;
  }

  .text {
    font-size: 1.6rem;
  }

  .btn {
    align-self: flex-start;
  }
`;

const Slide = ({ title, text, to, image, slideClass, position }) => {
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
        <Link to={to} className="btn btn--fill">
          Shop
        </Link>
      </div>
    </Wrapper>
  );
};

export default Slide;

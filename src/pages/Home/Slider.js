import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Slide from "./Slide";
import { slides } from "../../data/slides";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Wrapper = styled.div`
  height: 65rem;
  position: relative;
  overflow: hidden;
  border: 8px solid #777;
  margin-top: 2rem;

  .controls {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 2rem;
    z-index: 3;
  }

  .next {
    transform: translateX(100%);
  }

  .active {
    opacity: 1;
    transform: translateX(0);
  }

  .prev {
    transform: translateX(-100%);
  }

  .btn-circle {
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 1000rem;
    background-color: #f7f7f7;
    border: none;
  }

  .btn-prev,
  .btn-next {
    background-color: transparent;
    border: none;
    width: 2rem;
    height: 2rem;
  }

  .icon {
    height: 2rem;
    width: 2rem;
    color: #f7f7f7;
  }

  .active-btn {
    border: 2px solid #f7f7f7;
    background-color: #999;
  }
`;

const Slider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < 0) {
      setIndex(slides.length - 1);
    }
    if (index > slides.length - 1) {
      setIndex(0);
    }
  }, [index]);

  useEffect(() => {
    const timer = setTimeout(() => setIndex(index + 1), 5000);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Wrapper className="container">
      {slides.map((slide, i) => {
        let slideClass = "next";

        if (i === index) {
          slideClass = "active";
        }

        if (i === index - 1 || (index === 0 && i === slides.length - 1)) {
          slideClass = "prev";
        }

        return <Slide key={i} slideClass={slideClass} {...slide} />;
      })}
      <div className="controls">
        <button className="btn btn-prev" onClick={() => setIndex(index - 1)}>
          <FaChevronLeft className="icon" />
        </button>
        {slides.map((_, i) => {
          return (
            <button
              key={i}
              className={`btn btn-circle ${index === i ? "active-btn" : ""}`}
              onClick={() => setIndex(i)}
            ></button>
          );
        })}
        <button className="btn btn-next" onClick={() => setIndex(index + 1)}>
          <FaChevronRight className="icon" />
        </button>
      </div>
    </Wrapper>
  );
};

export default Slider;

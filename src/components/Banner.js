import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { updateFilters } from "../features/productsSlice";

const Wrapper = styled.div`
  background-color: var(--color-primary-dark);
  height: 4.4rem;
  position: relative;

  .message {
    color: var(--color-white);
    font-weight: 400;
    font-size: 1.4rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: all 1s ease-in-out;
    visibility: hidden;
  }

  .message-bold {
    color: var(--color-secondary);
    font-weight: 600;
    text-transform: uppercase;
  }

  .message--active {
    opacity: 1;
    z-index: 2;
    visibility: visible;
  }
`;

const Banner = () => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();

  const messages = [
    <span>Free shipping on orders $50+</span>,
    <span>
      Save up to <strong>40%</strong> on select sale items.{" "}
      <Link
        className="message-bold"
        to="/shop"
        onClick={() =>
          dispatch(updateFilters({ filter: "onSale", value: true }))
        }
      >
        shop now
      </Link>
    </span>,
    <span>
      Get 5% off your order with promo code{" "}
      <strong className="message-bold">save5</strong>
    </span>,
  ];

  useEffect(() => {
    if (index > messages.length - 1) setIndex(0);
  }, [index]);

  useEffect(() => {
    const timeout = setTimeout(() => setIndex(index + 1), 5000);
    return () => clearTimeout(timeout);
  });

  return (
    <Wrapper>
      {messages.map((message, i) => (
        <p
          key={i}
          className={`message ${index === i ? "message--active" : ""}`}
        >
          {message}
        </p>
      ))}
      <p className="message"></p>
    </Wrapper>
  );
};

export default Banner;

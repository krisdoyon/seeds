import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 4rem;
  align-items: stretch;
  align-self: flex-start;
  background-color: var(--color-grey-3);
  gap: 1px;
  padding: 1px;
  margin-bottom: 2rem;
  border-radius: 0.5rem;

  & > * {
    background-color: #fff;
    border-radius: 0;
  }

  .btn-increase,
  .btn-decrease {
    border: none;
    padding: 0 1.2rem;
    background-color: var(--color-grey-2);
    color: var(--color-grey-4);
    transition: all 0.2s;

    &:hover {
      background-color: var(--color-grey-3);
    }
  }

  .btn-decrease {
    border-radius: 0.4rem 0 0 0.4rem;
  }

  .btn-increase {
    border-radius: 0 0.4rem 0.4rem 0;
  }

  .quantity {
    font-size: 2rem;
    width: 15rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const QuantityBtns = ({ quantity, handleDecrease, handleIncrease }) => {
  return (
    <Wrapper className="btn-wrapper">
      <button className="btn btn-decrease" onClick={handleDecrease}>
        <FaMinus />
      </button>
      <div className="quantity">{quantity}</div>
      <button className="btn btn-increase" onClick={handleIncrease}>
        <FaPlus />
      </button>
    </Wrapper>
  );
};

export default QuantityBtns;
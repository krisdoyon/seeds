import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  height: 4rem;
  align-items: stretch;
  align-self: flex-start;
  background-color: var(--color-grey-3);
  gap: 1px;
  padding: 1px;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  width: 22rem;

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
    height: 100%;

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
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const QuantityBtns = ({
  quantity,
  inStock,
  handleDecrease,
  handleIncrease,
}) => {
  return (
    <Wrapper className="qty-btns">
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

import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addPromo, removePromo } from "../../features/cartSlice";
import { promoCodes } from "../../data/promo";
import { FaTag } from "react-icons/fa";

const Wrapper = styled.div`
  .promo {
    display: grid;
    grid-template-columns: 1fr max-content;
  }

  .promo-heading {
    text-transform: uppercase;
    font-size: 1.6rem;
    font-weight: 400;
    margin-bottom: 0.4rem;
  }

  input {
    border-radius: 0rem;
    border: 1px solid var(--color-grey-3);
    text-transform: uppercase;
    font-size: 1.6rem;
    color: var(--color-grey-4);

    &:focus {
      outline: none;
    }
  }

  .btn-apply {
    padding: 0.8rem 1.6rem;
    font-size: 1.4rem;
    border-radius: 0;
  }



  .promo {
    height: 3.6rem;
    border-radius: var(--border-radius);

    span {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }
  }

  .promo-applied {
    border: 1px solid var(--color-primary-dark);
    padding: 0 1rem;
  }
`;

const CartPromo = () => {
  const { promo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [promoInput, setPromoInput] = useState("");
  const handlePromo = (e) => {
    const promoMatch = promoCodes.find((item) => item.code === promoInput);
    setPromoInput("");
    if (promoMatch) {
      dispatch(addPromo({ ...promoMatch }));
    }
  };
  return (
    <Wrapper>
      <h3 className="promo-heading">Promo code</h3>
      {promo.code !== null && (
        <div className="promo promo-applied">
          <span>
            <FaTag />
            {`${promo.code} (${promo.percent * 100}% off)`}
          </span>
          <button
            className="btn btn-remove"
            onClick={() => dispatch(removePromo())}
          >
            Remove
          </button>
        </div>
      )}
      {promo.code === null && (
        <div className="promo">
          <input
            type="text"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
          />
          <button className="btn btn--fill btn-apply" onClick={handlePromo}>
            apply
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default CartPromo;

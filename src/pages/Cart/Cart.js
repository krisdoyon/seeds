import styled from "styled-components";
import Breadcrumb from "../../components/Breadcrumb";
import { useSelector } from "react-redux";
import CartSummary from "./CartSummary";
import CartHeader from "./CartHeader";
import CartEmpty from "./CartEmpty";
import CartPromo from "./CartPromo";
import CartItems from "./CartItems";

const Wrapper = styled.div`
  max-width: 100rem !important;

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2rem;

    & > * {
      width: 30rem;
    }
  }
`;

const Cart = () => {
  const { amount } = useSelector((state) => state.cart);

  return (
    <Wrapper className="container">
      <Breadcrumb title="Cart" />
      <CartHeader />
      {amount === 0 && <CartEmpty />}
      {amount > 0 && (
        <>
          <CartItems />
          <div className="wrapper">
            <CartPromo />
            <CartSummary />
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default Cart;

import styles from "./Cart.module.scss";
import { useSelector } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb";
import CartSummary from "./CartSummary/";
import CartHeader from "./CartHeader";
import CartEmpty from "./CartEmpty/";
import CartPromo from "./CartPromo";
import CartItems from "./CartItems/";
import Button from "../../components/Button";

const Cart = () => {
  const { amount } = useSelector((state) => state.cart);

  return (
    <div className={`container ${styles.wrapper}`}>
      <Breadcrumb title="Cart" />
      <CartHeader />
      {amount === 0 && <CartEmpty />}
      {amount > 0 && (
        <>
          <CartItems />
          <div className={styles["flex-wrapper"]}>
            <CartPromo />
            <CartSummary />
            <Button to="/checkout" fill>
              checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

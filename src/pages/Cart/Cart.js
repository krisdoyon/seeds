import styles from "./Cart.module.scss";
import Breadcrumb from "../../components/Breadcrumb";
import { useSelector } from "react-redux";
import CartSummary from "./CartSummary/";
import CartHeader from "./CartHeader";
import CartEmpty from "./CartEmpty/";
import CartPromo from "./CartPromo";
import CartItems from "./CartItems/";

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
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

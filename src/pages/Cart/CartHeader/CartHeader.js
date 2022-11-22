import styles from "./CartHeader.module.scss";
import { useSelector } from "react-redux";
import { formatPrice } from "../../../utils/formatPrice";

const CartHeader = () => {
  const { subtotal, shipping, amount } = useSelector((state) => state.cart);

  const noFreeShipping = (
    <p className={styles["shipping-message"]}>
      Add <strong>{formatPrice(5000 - subtotal)}</strong> more to qualify for
      free shipping!
    </p>
  );
  const freeShipping = (
    <p className={styles["shipping-message"]}>
      Your order qualifies for FREE SHIPPING!
    </p>
  );
  return (
    <header className={styles.header}>
      <h2 className={styles.heading}>YOUR CART</h2>
      {amount !== 0 && shipping === 0 && freeShipping}
      {amount !== 0 && shipping !== 0 && noFreeShipping}
    </header>
  );
};

export default CartHeader;

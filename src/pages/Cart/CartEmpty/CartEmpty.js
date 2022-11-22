import styles from "./CartEmpty.module.scss";
import Button from "../../../components/Button";

const CartEmpty = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.message}>No items in your cart</p>
      <Button to="/shop" fill>
        Continue Shopping
      </Button>
    </div>
  );
};

export default CartEmpty;

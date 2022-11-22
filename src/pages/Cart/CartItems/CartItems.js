import styles from "./CartItems.module.scss";
import sharedStyles from "../Cart.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../../features/cartSlice";
import Button from "../../../components/Button";
import CartItem from "../CartItem";

const CartItems = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <header className={`${styles["items-header"]} ${sharedStyles.grid}`}>
        <p>Item</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Subtotal</p>
        <p></p>
      </header>
      <div className={styles.items}>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <div className={styles["buttons-wrapper"]}>
        <Button to="/shop" fill>
          continue shopping
        </Button>
        <Button fill onClick={() => dispatch(clearCart())}>
          clear cart
        </Button>
      </div>
    </div>
  );
};

export default CartItems;

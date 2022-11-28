import styles from "./CartItems.module.scss";
import sharedStyles from "../Cart.module.scss";
import { useSelector, useDispatch } from "react-redux";
import Button from "../../../components/Button";
import CartItem from "../CartItem";
import { openModal } from "../../../features/modalSlice";

const CartItems = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
      <div>
        <header className={`${styles["items-header"]} ${sharedStyles.grid}`}>
          <p>Item</p>
          <p>Price</p>
          <p>Qty</p>
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
          <Button
            fill
            onClick={() =>
              dispatch(
                openModal({ type: "confirm", action: "clear", page: "cart" })
              )
            }
          >
            clear cart
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartItems;

import styles from "./CartDropdown.module.scss";
import CartPreviewItem from "../CartPreviewItem";
import Button from "../../../../components/Button";
import { useSelector } from "react-redux";
import { formatPrice } from "../../../../utils/formatPrice";

const CartDropdown = ({ setShowDropdown }) => {
  const { cartItems, subtotal } = useSelector((state) => state.cart);

  return (
    <div
      className={styles.dropdown}
      onMouseOver={() => setShowDropdown(true)}
      onMouseOut={() => setShowDropdown(false)}
    >
      {cartItems.length === 0 && (
        <div className={styles.empty}>
          <p>Your cart is empty.</p>
          <Button to="/shop" fill>
            Continue Shopping
          </Button>
        </div>
      )}

      {cartItems.length !== 0 && (
        <>
          {cartItems.map((item) => {
            return <CartPreviewItem key={item.id} {...item} />;
          })}
          <footer className={styles.footer}>
            <div>
              <strong>Subtotal:</strong>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <Button to="/cart" fill>
              view cart
            </Button>
          </footer>
        </>
      )}
    </div>
  );
};

export default CartDropdown;

import styles from "./CartDropdown.module.scss";
import CartPreviewItem from "../CartPreviewItem";
import Button from "../../../../components/Button";
import { useSelector } from "react-redux";
import { formatPrice } from "../../../../utils/formatPrice";
import DropdownMenu from "../../../../components/DropdownMenu";

const CartDropdown = ({ setShowDropdown }) => {
  const { cartItems, subtotal } = useSelector((state) => state.cart);

  return (
    <DropdownMenu className={styles.dropdown} setShowDropdown={setShowDropdown}>
      {cartItems.length === 0 && (
        <div className={styles.empty}>
          <p>No items in your cart.</p>
          <Button to="/shop" fill onClick={() => setShowDropdown(false)}>
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
            <Button onClick={() => setShowDropdown(false)} to="/cart" fill>
              view cart
            </Button>
          </footer>
        </>
      )}
    </DropdownMenu>
  );
};

export default CartDropdown;

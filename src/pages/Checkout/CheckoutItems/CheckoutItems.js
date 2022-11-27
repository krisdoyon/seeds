import CheckoutItem from "../CheckoutItem/CheckoutItem";
import { useSelector } from "react-redux";
import styles from "./CheckoutItems.module.scss";

const CheckoutItems = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div className={styles.items}>
      {cartItems.map((item) => {
        return <CheckoutItem key={item.id} {...item} />;
      })}
    </div>
  );
};

export default CheckoutItems;

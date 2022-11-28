import styles from "./CartSummary.module.scss";
import { formatPrice } from "../../../utils/formatPrice";

const CartSummary = ({
  subtotal,
  tax,
  shippingCost,
  total,
  amount,
  promo,
  className,
}) => {
  return (
    <div className={`${styles.summary} ${className ? className : ""}`}>
      <h3 className={styles.title}>ORDER SUMMARY:</h3>
      <div className={styles.grid}>
        <p className={styles.amount}>{`${amount} ${
          amount === 1 ? "item" : "items"
        }`}</p>
        <p>Subtotal:</p>
        <p className={styles.value}>{formatPrice(subtotal)}</p>
        {promo?.amount > 0 && (
          <>
            <p className={styles["promo-label"]}>Promo:</p>
            <p className={`${styles.value} ${styles["promo-label"]}`}>
              - {formatPrice(promo.amount)}
            </p>
          </>
        )}
        <p>Tax:</p>
        <p className={styles.value}>{formatPrice(tax)}</p>
        <p>Shipping:</p>
        <p className={styles.value}>
          {shippingCost === 0 ? "FREE!" : formatPrice(shippingCost)}
        </p>
        <p>
          <strong>Total:</strong>
        </p>
        <p className={styles.value}>
          <strong>{formatPrice(total)}</strong>
        </p>
      </div>
    </div>
  );
};

export default CartSummary;

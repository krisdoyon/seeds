import styles from "./QuantityBtns.module.scss";
import Button from "../Button/Button";

import { FaMinus, FaPlus } from "react-icons/fa";

const QuantityBtns = ({
  quantity,
  handleDecrease,
  handleIncrease,
  className,
  small,
}) => {
  return (
    <div
      className={`${styles.wrapper} ${className} ${small ? styles.small : ""}`}
      aria-label="quantity-btns"
    >
      <Button
        className={styles.decrease}
        onClick={handleDecrease}
        aria-label="decrease-quantity"
      >
        <FaMinus className={styles.icon} />
      </Button>
      <div className={styles.quantity}>{quantity}</div>
      <Button
        className={styles.increase}
        onClick={handleIncrease}
        aria-label="increase-quantity"
      >
        <FaPlus className={styles.icon} />
      </Button>
    </div>
  );
};

export default QuantityBtns;

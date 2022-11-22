import styles from "./QuantityBtns.module.scss";
import Button from "../Button/Button";

import { FaMinus, FaPlus } from "react-icons/fa";

const QuantityBtns = ({
  quantity,
  handleDecrease,
  handleIncrease,
  className,
}) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <Button className={styles.decrease} onClick={handleDecrease}>
        <FaMinus />
      </Button>
      <div className={styles.quantity}>{quantity}</div>
      <Button className={styles.increase} onClick={handleIncrease}>
        <FaPlus />
      </Button>
    </div>
  );
};

export default QuantityBtns;

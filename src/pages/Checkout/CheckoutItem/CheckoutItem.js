import styles from "./CheckoutItem.module.scss";
import { formatPrice } from "../../../utils/formatPrice";

const CheckoutItem = ({ id, title, quantity, price, salePrice, imgURL }) => {
  return (
    <div className={styles.item}>
      <img src={imgURL} alt={title} />
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p>{`Qty: ${quantity}`}</p>
        <p>{`${formatPrice(salePrice || price)} / ea.`}</p>
      </div>
    </div>
  );
};

export default CheckoutItem;

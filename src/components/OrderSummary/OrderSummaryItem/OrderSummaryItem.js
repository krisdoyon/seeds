import styles from "./OrderSummaryItem.module.scss";
import { OnSaleTag } from "../../Tags";
import { formatPrice } from "../../../utils/formatPrice";

const OrderSummaryItem = ({ title, quantity, salePrice, price, imgURL }) => {
  return (
    <div className={styles.wrapper}>
      <img src={imgURL} alt={title} />
      <div className={styles.info}>
        <h4 className={styles.title}>{title}</h4>
        <p>Qty: {quantity}</p>
        <div className={styles.prices}>
          <p className={`${salePrice ? styles.strike : ""}`}>
            {formatPrice(price)} / ea.
          </p>
          {salePrice && <p>{formatPrice(salePrice)} / ea.</p>}
          {salePrice && <OnSaleTag />}
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryItem;

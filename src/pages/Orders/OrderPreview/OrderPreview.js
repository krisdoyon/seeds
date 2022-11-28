import styles from "./OrderPreview.module.scss";
import Button from "../../../components/Button";
import { formatPrice } from "../../../utils/formatPrice";

const OrderPreview = ({ orderNumber, displayDate, payment: { total } }) => {
  return (
    <article className={styles.wrapper}>
      <p>#{orderNumber}</p>
      <p>{displayDate}</p>
      <p>{formatPrice(total)}</p>
      <Button fill to={`/orders/${orderNumber}`}>
        View
      </Button>
    </article>
  );
};

export default OrderPreview;

import styles from "./OrderPreview.module.scss";
import Button from "../../../components/Button";

const OrderPreview = ({ orderNumber }) => {


  return (
    <article className={styles.wrapper}>
      <h3>Order#: {orderNumber}</h3>
      <Button fill to={`/orders/${orderNumber}`}>
        View Order
      </Button>
    </article>
  );
};

export default OrderPreview;

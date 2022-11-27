import { useSelector } from "react-redux";
import { formatPrice } from "../../utils/formatPrice";
import Checkbox from "../Checkbox/";
import OrderSummaryItem from "./OrderSummaryItem/OrderSummaryItem";
import styles from "./OrderSummary.module.scss";

const OrderSummary = () => {
  const {
    currentOrder: {
      orderNumber,
      date,
      shipping,
      billing,
      payment,
      shippingSame,
      products,
    },
  } = useSelector((state) => state.orders);

  const displayDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div>
          <p>
            <strong>Order #:</strong> {orderNumber}
          </p>
          <p>
            <strong>Order Date:</strong> {displayDate}
          </p>
          <p>
            <strong>Order Total:</strong> {formatPrice(payment.total)}
          </p>
        </div>
        <div>
          <h3 className={styles["section-heading"]}>Payment method:</h3>
          <p>{`Card ending in ${payment.card.number.slice(-4)}`}</p>
        </div>
        <div>
          <h3 className={styles["section-heading"]}>Billed to:</h3>
          <p>
            {billing.first} {billing.last}
          </p>
          <p>{billing.address1}</p>
          {billing.address2 && <p>{billing.address2}</p>}
          <p>{`${billing.city}, ${billing.state} ${billing.zip}`}</p>
        </div>
        <div>
          <h3 className={styles["section-heading"]}>Shipped to:</h3>
          {shippingSame && (
            <Checkbox checked label={"Same as billing address"} />
          )}
          {!shippingSame && (
            <>
              <p>
                {shipping.first} {shipping.last}
              </p>
              <p>{shipping.address1}</p>
              {shipping.address2 && <p>{shipping.address2}</p>}
              <p>{`${shipping.city}, ${shipping.state} ${shipping.zip}`}</p>
            </>
          )}
        </div>
      </div>
      <div>
        <div>
          <h3 className={styles["section-heading"]}>Products</h3>
          <div className={styles.items}>
            {products.map((product) => {
              return <OrderSummaryItem key={product.id} {...product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

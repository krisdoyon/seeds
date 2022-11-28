import { useSelector } from "react-redux";
import Checkbox from "../Checkbox/";
import OrderSummaryItem from "./OrderSummaryItem/OrderSummaryItem";
import styles from "./OrderSummary.module.scss";
import CartSummary from "../../pages/Cart/CartSummary";

const OrderSummary = () => {
  const {
    currentOrder: {
      amount,
      shipping,
      billing,
      payment,
      shippingSame,
      products,
    },
  } = useSelector((state) => state.orders);

  return (
    <div className={styles.wrapper}>
      <div className={styles.column}>
        <CartSummary className={styles.summary} {...payment} amount={amount} />
        <div className={styles.info}>
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
              <Checkbox checked readOnly label={"Same as billing address"} />
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
      </div>
      <div className={styles.items}>
        {products.map((product) => {
          return <OrderSummaryItem key={product.id} {...product} />;
        })}
      </div>
    </div>
  );
};

export default OrderSummary;

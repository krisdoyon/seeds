import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import OrderPreview from "./OrderPreview";
import styles from "./Orders.module.scss";
import { openModal } from "../../features/modalSlice";

const Orders = () => {
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  return (
    <section className="container">
      <Breadcrumb title="orders" />
      <header className={styles.header}>
        <h2>Your Orders</h2>
        {orders.length === 0 && (
          <p className={styles["no-orders"]}>No orders to show.</p>
        )}
        <div className={styles["btn-container"]}>
          {orders.length > 0 && (
            <Button
              fill
              onClick={() =>
                dispatch(
                  openModal({
                    type: "confirm",
                    action: "clear",
                    page: "orders",
                  })
                )
              }
            >
              CLEAR ORDERS
            </Button>
          )}
          <Button
            fill
            onClick={() =>
              dispatch(openModal({ type: "confirm", action: "load" }))
            }
          >
            Load Test Orders
          </Button>
        </div>
      </header>

      {orders.length > 0 && (
        <div className={styles.orders}>
          <header>
            <p>Order Number</p>
            <p>Date</p>
            <p>Total</p>
          </header>
          <div className={styles.list}>
            {orders.map((order) => {
              return <OrderPreview key={order.orderNumber} {...order} />;
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default Orders;

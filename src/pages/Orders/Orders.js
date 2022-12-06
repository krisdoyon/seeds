import styles from "./Orders.module.scss";
import { useSelector } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner/Spinner";
import OrderPreview from "./OrderPreview";

const Orders = () => {
  const { orders, isLoading } = useSelector((state) => state.orders);
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <section>
      <Breadcrumb title="orders" />
      <header className={styles.header}>
        <h2>Your Orders</h2>
        {isLoading && <Spinner />}
        {!isLoading && !isLoggedIn && (
          <>
            <p className={styles.message}>
              Log in to see your previously placed orders.
            </p>
            <Button to="/login" fill>
              Log in
            </Button>
          </>
        )}
        {!isLoading && isLoggedIn && orders.length === 0 && (
          <p className={styles.message}>No orders to show.</p>
        )}
      </header>

      {!isLoading && isLoggedIn && orders.length > 0 && (
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

import { useSelector } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import OrderPreview from "./OrderPreview";
import styles from "./Orders.module.scss";

const Orders = () => {
  const { orders } = useSelector((state) => state.orders);

  const clearOrders = () => {
    localStorage.removeItem("orders");
    localStorage.removeItem("products");
    window.location.reload();
  };

  return (
    <section className="container">
      <Breadcrumb title="orders" />
      <h2 className={styles.heading}>Your Orders</h2>
      <Button fill className={styles["btn-clear"]} onClick={clearOrders}>
        CLEAR ORDERS
      </Button>
      <div className={styles.list}>
        {orders.map((order) => {
          return <OrderPreview key={order.orderNumber} {...order} />;
        })}
      </div>
    </section>
  );
};

export default Orders;

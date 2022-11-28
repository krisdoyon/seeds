import styles from "./SingleOrder.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import OrderSummary from "../../components/OrderSummary";
import { loadSingleOrder } from "../../features/ordersSlice";
import PageNotFound from "../PageNotFound";
import Breadcrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";

const SingleOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSingleOrder(id));
  }, [dispatch, id]);

  const {
    currentOrder: { orderNumber, displayDate },
    error,
  } = useSelector((state) => state.orders);

  if (error) {
    return <PageNotFound />;
  }

  if (orderNumber) {
    return (
      <section className={`container ${styles.wrapper}`}>
        <Button
          fill
          className={styles["btn-back"]}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Breadcrumb title={`#${orderNumber}`} orders />
        <header>
          <h2>{`Order #${orderNumber}`}</h2>
          <p>{`Placed on ${displayDate}`}</p>
        </header>
        <OrderSummary />
      </section>
    );
  }
};

export default SingleOrder;

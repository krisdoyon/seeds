import styles from "./SingleOrder.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import OrderSummary from "../../components/OrderSummary";
import { loadSingleOrder } from "../../features/ordersSlice";
import { openModal } from "../../features/modalSlice";
import PageNotFound from "../PageNotFound";
import Breadcrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner/Spinner";

const SingleOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    currentOrder: { orderNumber, displayDate, databaseId },
    error,
    isLoading,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    if (!isLoading) {
      dispatch(loadSingleOrder(id));
    }
  }, [dispatch, isLoading, id]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <PageNotFound />;
  }

  if (orderNumber) {
    return (
      <section className={styles.wrapper}>
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
          <Button
            fill
            onClick={() => {
              dispatch(
                openModal({
                  type: "confirm",
                  action: "return",
                  page: "orders",
                  title: orderNumber,
                  id: databaseId,
                })
              );
            }}
          >
            Return Order
          </Button>
        </header>
        <OrderSummary />
      </section>
    );
  }
};

export default SingleOrder;

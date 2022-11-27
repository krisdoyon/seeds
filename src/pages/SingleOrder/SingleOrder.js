import styles from "./SingleOrder.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import OrderSummary from "../../components/OrderSummary";
import { loadSingleOrder } from "../../features/ordersSlice";
import PageNotFound from "../PageNotFound";

const SingleOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSingleOrder(id));
  }, [dispatch, id]);

  const { currentOrder, error } = useSelector((state) => state.orders);

  if (error) {
    return <PageNotFound />;
  }

  if (currentOrder.orderNumber) {
    return (
      <section className="container">
        <h2>Order Summary</h2>
        <OrderSummary />
      </section>
    );
  }
};

export default SingleOrder;
